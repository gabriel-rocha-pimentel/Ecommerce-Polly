
import { supabase } from '@/lib/supabaseClient';

export const registerAdmin = async (name, email, password, companyName) => {
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        company_name: companyName || "Polly E-commerce",
      }
    }
  });

  if (signUpError) {
    console.error('Supabase SignUp Error:', signUpError);
    if (signUpError.message.includes("User already registered")) {
      throw new Error('Este e-mail já está cadastrado.');
    }
    throw new Error(signUpError.message || 'Erro ao cadastrar administrador.');
  }

  if (!authData.user) {
    throw new Error('Cadastro não retornou um usuário.');
  }

  return { 
    user: { 
      id: authData.user.id, 
      name: authData.user.user_metadata.name, 
      email: authData.user.email, 
      companyName: authData.user.user_metadata.company_name 
    }, 
    token: authData.session?.access_token 
  };
};

export const loginAdmin = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Supabase SignIn Error:', error);
    if (error.message.includes("Invalid login credentials")) {
      throw new Error('Credenciais de login inválidas.');
    }
    throw new Error(error.message || 'Erro ao realizar login.');
  }
  
  if (!data.user) {
    throw new Error('Login não retornou um usuário.');
  }

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
    token: data.session?.access_token 
  };
};

export const logoutAdmin = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Supabase SignOut Error:', error);
    throw new Error(error.message || 'Erro ao realizar logout.');
  }
  return { success: true };
};

export const updateAdminProfile = async (adminId, updatedData) => {
  const profileUpdate = {
    name: updatedData.name,
    company_name: updatedData.companyName,
    updated_at: new Date().toISOString(),
  };

  if (updatedData.email && adminId) {
     const { data: userUpdateData, error: userUpdateError } = await supabase.auth.updateUser({ email: updatedData.email });
     if (userUpdateError) {
        console.error('Supabase Update User Email Error:', userUpdateError);
        throw new Error(userUpdateError.message || "Erro ao atualizar e-mail do usuário.");
     }
     profileUpdate.email = userUpdateData.user.email;
  }
  
  if (updatedData.newPassword) {
    const { error: passwordUpdateError } = await supabase.auth.updateUser({ password: updatedData.newPassword });
    if (passwordUpdateError) {
      console.error('Supabase Update Password Error:', passwordUpdateError);
      throw new Error(passwordUpdateError.message || "Erro ao atualizar senha.");
    }
  }
  
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
  return { user: {id: data.id, name: data.name, email: data.email, companyName: data.company_name} };
};


export const deleteAdminAccount = async (adminId) => {
  const { error: profileDeleteError } = await supabase
    .from('profiles')
    .delete()
    .eq('id', adminId);

  if (profileDeleteError) {
      console.error('Supabase Delete Profile Error:', profileDeleteError);
      throw new Error(profileDeleteError.message || 'Erro ao excluir perfil do banco de dados.');
  }
  
  return { success: true, message: 'Conta de administrador excluída com sucesso.' };
};

export const getCurrentUser = async () => {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if(sessionError) {
    console.error('Error getting session:', sessionError);
    return null;
  }
  if (!session) return null;

  const { data: userData, error: userError } = await supabase.auth.getUser();
   if (userError || !userData?.user) {
    console.error('Error fetching user:', userError);
    return null;
  }
  
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id, name, email, company_name')
    .eq('id', userData.user.id)
    .single();

  if (profileError) {
    console.error('Error fetching profile data:', profileError);
    return null; 
  }
  
  return {
    id: profileData.id,
    name: profileData.name,
    email: profileData.email,
    companyName: profileData.company_name,
    token: session.access_token
  };
};
