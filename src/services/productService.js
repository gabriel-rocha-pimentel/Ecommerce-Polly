
import { supabase } from '@/lib/supabaseClient';

export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase Get Products Error:', error);
    throw new Error(error.message || 'Erro ao buscar produtos.');
  }
  return data.map(p => ({...p, images: p.images || []}));
};

export const getProductById = async (productId, adminIdToVerify = null) => {
  let query = supabase
    .from('products')
    .select('*')
    .eq('id', productId);

  if (adminIdToVerify) {
    query = query.eq('admin_id', adminIdToVerify);
  }
  
  const { data, error } = await query.single();

  if (error) {
    console.error('Supabase Get Product By ID Error:', error);
    if (error.code === 'PGRST116') { 
        throw new Error('Produto não encontrado ou não pertence a este administrador.');
    }
    throw new Error(error.message || 'Erro ao buscar produto.');
  }
  return {...data, images: data.images || []};
};

export const getProductsByAdminId = async (adminId) => {
  if (!adminId) {
    throw new Error("ID do administrador é obrigatório.");
  }
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('admin_id', adminId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase Get Products By Admin ID Error:', error);
    throw new Error(error.message || 'Erro ao buscar produtos do administrador.');
  }
  return data.map(p => ({...p, images: p.images || []}));
};

export const createProduct = async (productData) => {
  const { adminId, ...restOfProductData } = productData; 
  const productToInsert = {
    ...restOfProductData,
    admin_id: adminId,
    price: parseFloat(String(productData.price).replace(',', '.')),
    stock: parseInt(productData.stock, 10),
    tags: Array.isArray(productData.tags) ? productData.tags : (productData.tags?.split(',').map(tag => tag.trim()).filter(tag => tag) || []),
    images: productData.images || [],
  };

  const { data, error } = await supabase
    .from('products')
    .insert([productToInsert])
    .select()
    .single();

  if (error) {
    console.error('Supabase Create Product Error:', error);
    throw new Error(error.message || 'Erro ao criar produto.');
  }
  return {...data, images: data.images || []};
};

export const updateProduct = async (updatedProductData) => {
  const { id, adminId, ...restOfProductData } = updatedProductData;
  const productToUpdate = {
      ...restOfProductData,
      admin_id: adminId,
      price: parseFloat(String(updatedProductData.price).replace(',', '.')),
      stock: parseInt(updatedProductData.stock, 10),
      tags: Array.isArray(updatedProductData.tags) ? updatedProductData.tags : (updatedProductData.tags?.split(',').map(tag => tag.trim()).filter(tag => tag) || []),
      images: updatedProductData.images || [],
      updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('products')
    .update(productToUpdate)
    .eq('id', id)
    .eq('admin_id', adminId) 
    .select()
    .single();

  if (error) {
    console.error('Supabase Update Product Error:', error);
    throw new Error(error.message || 'Erro ao atualizar produto.');
  }
  return {...data, images: data.images || []};
};

export const deleteProduct = async (productId, adminId) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .eq('admin_id', adminId); 

  if (error) {
    console.error('Supabase Delete Product Error:', error);
    throw new Error(error.message || 'Erro ao excluir produto.');
  }
  return { success: true, message: 'Produto excluído com sucesso.' };
};

export const deleteProductsByAdminId = async (adminId) => {
    if (!adminId) {
        throw new Error("ID do administrador é obrigatório para excluir produtos.");
    }
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('admin_id', adminId);

    if (error) {
        console.error('Supabase Delete Products By Admin ID Error:', error);
        throw new Error(error.message || 'Erro ao excluir produtos do administrador.');
    }
    return { success: true, message: 'Produtos do administrador removidos.' };
};
