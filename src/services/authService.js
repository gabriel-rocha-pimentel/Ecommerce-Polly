import { supabase } from '@/lib/supabaseClient';

// Serviço de autenticação e gerenciamento do administrador

// 1. Cadastro de administrador (Auth + Profile)
export const registerAdmin = async (name, email, password, companyName) => {
  // 1.1 Cria usuário no Auth
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, company_name: companyName || 'Polly E-commerce' } }
  });
  if (signUpError) {
    console.error('Supabase SignUp Error:', signUpError);
    if (signUpError.message.includes('User already registered')) {
      throw new Error('Este e-mail já está cadastrado.');
    }
    throw new Error(signUpError.message || 'Erro ao cadastrar administrador.');
  }
  if (!authData.user) {
    throw new Error('Cadastro não retornou um usuário.');
  }

  // 1.2 Cria registro de perfil no banco (profiles)
  const profilePayload = {
    id: authData.user.id,
    name,
    email,
    company_name: companyName || 'Polly E-commerce',
    created_at: new Date().toISOString()
  };
  const { error: profileError } = await supabase
    .from('profiles')
    .insert(profilePayload);
  if (profileError) {
    console.error('Supabase Insert Profile Error:', profileError);
    // Se falhar inserir profile, opcional: reverter user no Auth (via backend)
    throw new Error('Erro ao criar perfil do administrador.');
  }

  return {
    user: { ...profilePayload },
    token: authData.session?.access_token ?? null
  };
};

// 2. Login de administrador
export const loginAdmin = async (email, password) => {
  const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  if (signInError) {
    console.error('Supabase SignIn Error:', signInError);
    if (signInError.message.includes('Invalid login credentials')) {
      throw new Error('Credenciais de login inválidas.');
    }
    throw new Error(signInError.message || 'Erro ao realizar login.');
  }
  if (!data.user) {
    throw new Error('Login não retornou um usuário.');
  }

  // Busca perfil existente
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id, name, email, company_name')
    .eq('id', data.user.id)
    .single();
  if (profileError) {
    console.error('Supabase Get Profile Error:', profileError);
    throw new Error(profileError.message || 'Erro ao buscar perfil do administrador.');
  }

  return {
    user: {
      id: profileData.id,
      name: profileData.name,
      email: profileData.email,
      companyName: profileData.company_name
    },
    token: data.session?.access_token ?? null
  };
};

// 3. Logout de administrador
export const logoutAdmin = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Supabase SignOut Error:', error);
    throw new Error(error.message || 'Erro ao realizar logout.');
  }
  return { success: true };
};

// 4. Atualização de perfil do administrador
export const updateAdminProfile = async (adminId, updatedData) => {
  // 4.1 Atualiza e-mail e/ou senha no Auth, se fornecidos
  if (updatedData.email) {
    const { data: userUpdateData, error: userUpdateError } = await supabase.auth.updateUser({ email: updatedData.email });
    if (userUpdateError) {
      console.error('Supabase Update User Email Error:', userUpdateError);
      throw new Error(userUpdateError.message || 'Erro ao atualizar e-mail do usuário.');
    }
  }
  if (updatedData.newPassword) {
    const { error: passwordUpdateError } = await supabase.auth.updateUser({ password: updatedData.newPassword });
    if (passwordUpdateError) {
      console.error('Supabase Update Password Error:', passwordUpdateError);
      throw new Error(passwordUpdateError.message || 'Erro ao atualizar senha.');
    }
  }

  // 4.2 Prepara payload para profiles
  const profileUpdate = {
    name: updatedData.name,
    company_name: updatedData.companyName,
    updated_at: new Date().toISOString()
  };
  // Se mudou e-mail, inclua no payload
  if (updatedData.email) profileUpdate.email = updatedData.email;

  const { data, error } = await supabase
    .from('profiles')
    .update(profileUpdate)
    .eq('id', adminId)
    .select('id, name, email, company_name')
    .single();
  if (error) {
    console.error('Supabase Update Profile Error:', error);
    throw new Error(error.message || 'Erro ao atualizar perfil.');
  }
  return { user: { id: data.id, name: data.name, email: data.email, companyName: data.company_name } };
};

// 5. Exclusão de conta do administrador e dados relacionados
export const deleteAdminAccount = async (adminId) => {
  // 5.1 Deleta produtos criados por este admin
  const { error: productsDeleteError } = await supabase
    .from('products')
    .delete()
    .eq('admin_id', adminId);
  if (productsDeleteError) {
    console.error('Supabase Delete Products Error:', productsDeleteError);
    throw new Error(productsDeleteError.message || 'Erro ao excluir produtos do usuário.');
  }

  // 5.2 Deleta perfil
  const { error: profileDeleteError } = await supabase
    .from('profiles')
    .delete()
    .eq('id', adminId);
  if (profileDeleteError) {
    console.error('Supabase Delete Profile Error:', profileDeleteError);
    throw new Error(profileDeleteError.message || 'Erro ao excluir perfil do usuário.');
  }

  // 5.3 Chamada a endpoint backend para deletar usuário no Auth (requer chave de serviço)
  // Exemplo: await fetch('/api/delete-user', { method: 'POST', body: JSON.stringify({ userId: adminId }) });

  return { success: true, message: 'Conta de administrador e dados relacionados foram excluídos.' };
};

// 6. Obtém usuário autenticado e perfil
export const getCurrentUser = async () => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error('Supabase GetUser Error:', userError);
    return null;
  }

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id, name, email, company_name')
    .eq('id', user.id)
    .single();
  if (profileError) {
    console.error('Supabase Get Profile Error:', profileError);
    return null;
  }

  return {
    id: profileData.id,
    name: profileData.name,
    email: profileData.email,
    companyName: profileData.company_name,
    token: (await supabase.auth.getSession()).data.session?.access_token ?? null
  };
};
