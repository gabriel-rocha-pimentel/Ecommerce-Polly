import { supabase } from '@/lib/supabaseClient';

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Supabase Get Categories Error:', error);
    throw new Error(error.message || 'Erro ao buscar categorias.');
  }
  return data;
};

export const createCategory = async (categoryData) => {
  // categoryData should include { name, admin_id }
  const { data, error } = await supabase
    .from('categories')
    .insert([categoryData])
    .select()
    .single();

  if (error) {
    console.error('Supabase Create Category Error:', error);
    if (error.message.includes('duplicate key value violates unique constraint "categories_name_key"')) {
      throw new Error('Uma categoria com este nome já existe.');
    }
    throw new Error(error.message || 'Erro ao criar categoria.');
  }
  return data;
};

// Add update and delete functions if needed later
export const updateCategory = async (categoryId, categoryData) => {
  const { data, error } = await supabase
    .from('categories')
    .update(categoryData)
    .eq('id', categoryId)
    .select()
    .single();

  if (error) {
    console.error('Supabase Update Category Error:', error);
    throw new Error(error.message || 'Erro ao atualizar categoria.');
  }
  return data;
};

export const deleteCategory = async (categoryId, adminId) => {
  // Ensure only the admin who created it can delete, or superadmin if logic allows
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId)
    .eq('admin_id', adminId); 

  if (error) {
    console.error('Supabase Delete Category Error:', error);
    throw new Error(error.message || 'Erro ao excluir categoria.');
  }
  return { success: true, message: 'Categoria excluída com sucesso.' };
};