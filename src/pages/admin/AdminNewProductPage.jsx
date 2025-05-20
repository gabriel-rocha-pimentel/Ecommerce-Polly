import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, ImagePlus, Tags, Trash2, PlusCircle, Loader2 } from 'lucide-react';
import * as productService from '@/services/productService.js';
import * as categoryService from '@/services/categoryService.js';
import { useAuth } from '@/contexts/AuthContext';

const AdminNewProductPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { admin } = useAuth();

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    category: '', // Will store category name or ID
    price: '',
    images: [], 
    stock: '',
    sku: '',
    tags: '',
    isFeatured: false,
    isPromotional: false,
  });

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsCategoryLoading(true);
      try {
        const fetchedCategories = await categoryService.getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        toast({ title: 'Erro ao buscar categorias', description: error.message, variant: 'destructive' });
      } finally {
        setIsCategoryLoading(false);
      }
    };
    fetchCategories();
  }, [toast]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? Boolean(checked) : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // For now, using placeholder. In a real scenario, upload to Supabase Storage and get URLs.
    const imageUrls = files.map(file => `https://via.placeholder.com/300/407BFF/FFFFFF?text=${encodeURIComponent(file.name)}`); 
    setProductData(prev => ({ ...prev, images: [...prev.images, ...imageUrls] }));
  };

  const removeImage = (index) => {
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleCreateNewCategory = async () => {
    if (!newCategoryName.trim() || !admin?.id) {
      toast({ title: 'Nome Inválido', description: 'Por favor, insira um nome válido para a nova categoria.', variant: 'destructive' });
      return;
    }
    setIsCategoryLoading(true);
    try {
      const createdCategory = await categoryService.createCategory({ name: newCategoryName, admin_id: admin.id });
      setCategories(prev => [...prev, createdCategory]);
      setProductData(prev => ({ ...prev, category: createdCategory.name })); // Or createdCategory.id if using IDs
      setNewCategoryName('');
      setShowNewCategoryInput(false);
      toast({ title: 'Categoria Criada!', description: `${createdCategory.name} adicionada.` });
    } catch (error) {
      toast({ title: 'Erro ao Criar Categoria', description: error.message, variant: 'destructive' });
    } finally {
      setIsCategoryLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!admin || !admin.id) {
      toast({ title: 'Erro', description: 'Administrador não autenticado.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    try {
      const priceAsNumber = parseFloat(String(productData.price).replace(',', '.'));
      const stockAsNumber = parseInt(productData.stock, 10);

      if (isNaN(priceAsNumber) || isNaN(stockAsNumber)) {
        toast({ title: 'Erro de Validação', description: 'Preço e estoque devem ser números válidos.', variant: 'destructive' });
        setIsLoading(false);
        return;
      }
      
      if (!productData.category) {
        toast({ title: 'Erro de Validação', description: 'Por favor, selecione ou crie uma categoria.', variant: 'destructive' });
        setIsLoading(false);
        return;
      }

      const newProduct = {
        ...productData,
        price: priceAsNumber,
        stock: stockAsNumber,
        tags: productData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        adminId: admin.id, 
      };
      
      await productService.createProduct(newProduct);
      toast({ title: 'Produto Criado!', description: `${productData.name} foi adicionado com sucesso.` });
      navigate('/admin/produtos');
    } catch (error) {
      toast({ title: 'Erro ao Criar Produto', description: error.message, variant: 'destructive' });
      // setIsLoading(false) is important here too, to re-enable the button on error.
    } finally {
      // Ensure isLoading is set to false in the finally block
      // so it's always reset, regardless of success or failure.
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto text-polly-text dark:text-polly-white"
    >
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-6 btn-outline-primary dark:text-polly-blue dark:border-polly-blue dark:hover:bg-polly-blue/20 dark:hover:text-polly-white">
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>
      <Card className="shadow-xl bg-white dark:bg-polly-blue-dark/20 dark:border-polly-blue/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-polly-blue-dark dark:text-polly-blue">Adicionar Novo Produto</CardTitle>
          <CardDescription className="text-polly-gray-dark dark:text-polly-gray-light">Preencha os detalhes do novo produto.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Nome do Produto</Label>
              <Input id="name" name="name" value={productData.name} onChange={handleChange} required 
                     className="dark:bg-polly-text/20 dark:border-polly-blue/40 dark:focus:border-polly-blue"/>
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" name="description" value={productData.description} onChange={handleChange} required 
                        className="min-h-[100px] dark:bg-polly-text/20 dark:border-polly-blue/40 dark:focus:border-polly-blue"/>
            </div>
            
            <div>
              <Label htmlFor="category">Categoria</Label>
              <div className="flex items-center gap-2">
                <select 
                  id="category" 
                  name="category" 
                  value={productData.category} 
                  onChange={handleChange} 
                  required
                  className="flex-grow h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-polly-text/20 dark:border-polly-blue/40 dark:focus:border-polly-blue"
                  disabled={isCategoryLoading}
                >
                  <option value="">{isCategoryLoading ? "Carregando..." : "Selecione uma categoria"}</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option> 
                  ))}
                </select>
                <Button type="button" variant="outline" size="sm" onClick={() => setShowNewCategoryInput(prev => !prev)} className="btn-outline-primary dark:text-polly-blue dark:border-polly-blue dark:hover:bg-polly-blue/20 dark:hover:text-polly-white">
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
              {showNewCategoryInput && (
                <div className="mt-2 flex items-center gap-2">
                  <Input 
                    type="text" 
                    placeholder="Nova categoria" 
                    value={newCategoryName} 
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="dark:bg-polly-text/20 dark:border-polly-blue/40 dark:focus:border-polly-blue"
                  />
                  <Button type="button" size="sm" onClick={handleCreateNewCategory} disabled={isCategoryLoading || !newCategoryName.trim()} className="btn-primary">
                    {isCategoryLoading && newCategoryName ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Criar'}
                  </Button>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="price">Preço (R$)</Label>
              <Input id="price" name="price" type="text" placeholder="Ex: 99,90" value={productData.price} onChange={handleChange} required 
                     className="dark:bg-polly-text/20 dark:border-polly-blue/40 dark:focus:border-polly-blue"/>
            </div>

            <div>
              <Label htmlFor="images">Imagens</Label>
              <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-polly-blue/30 dark:border-polly-blue/50 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <ImagePlus className="mx-auto h-12 w-12 text-polly-gray-dark dark:text-polly-gray-light" />
                  <div className="flex text-sm text-polly-gray-dark dark:text-polly-gray-light">
                    <label htmlFor="images-upload" className="relative cursor-pointer rounded-md font-medium text-polly-blue hover:text-polly-blue-dark dark:hover:text-polly-blue/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-polly-blue">
                      <span>Carregar arquivos</span>
                      <Input id="images-upload" name="images-upload" type="file" className="sr-only" onChange={handleImageChange} multiple accept="image/*" />
                    </label>
                    <p className="pl-1">ou arraste e solte</p>
                  </div>
                  <p className="text-xs text-polly-gray-dark dark:text-polly-gray-light">PNG, JPG, GIF até 10MB</p>
                </div>
              </div>
              {productData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {productData.images.map((imgUrl, index) => (
                    <div key={index} className="relative group">
                      <img  src={imgUrl} alt={`Preview ${index + 1}`} className="h-24 w-full object-cover rounded-md" />
                      <Button type="button" variant="destructive" size="sm" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100" onClick={() => removeImage(index)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="stock">Estoque</Label>
                <Input id="stock" name="stock" type="number" value={productData.stock} onChange={handleChange} required 
                       className="dark:bg-polly-text/20 dark:border-polly-blue/40 dark:focus:border-polly-blue"/>
              </div>
              <div>
                <Label htmlFor="sku">SKU (Opcional)</Label>
                <Input id="sku" name="sku" value={productData.sku} onChange={handleChange} 
                       className="dark:bg-polly-text/20 dark:border-polly-blue/40 dark:focus:border-polly-blue"/>
              </div>
            </div>
            <div>
              <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
               <div className="relative">
                 <Tags className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-polly-gray-dark dark:text-polly-gray-light" />
                <Input id="tags" name="tags" value={productData.tags} onChange={handleChange} placeholder="Ex: promoção, novo, verão" 
                       className="pl-10 dark:bg-polly-text/20 dark:border-polly-blue/40 dark:focus:border-polly-blue"/>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="isFeatured" name="isFeatured" checked={productData.isFeatured} onCheckedChange={(checked) => handleChange({ target: { name: 'isFeatured', type: 'checkbox', checked }})}
                            className="data-[state=checked]:bg-polly-blue data-[state=checked]:border-polly-blue dark:data-[state=checked]:bg-polly-blue dark:data-[state=checked]:border-polly-blue" />
                <Label htmlFor="isFeatured" className="font-normal">Marcar como produto em destaque</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="isPromotional" name="isPromotional" checked={productData.isPromotional} onCheckedChange={(checked) => handleChange({ target: { name: 'isPromotional', type: 'checkbox', checked }})}
                            className="data-[state=checked]:bg-polly-blue data-[state=checked]:border-polly-blue dark:data-[state=checked]:bg-polly-blue dark:data-[state=checked]:border-polly-blue"/>
                <Label htmlFor="isPromotional" className="font-normal">Marcar como produto promocional</Label>
              </div>
            </div>
            <CardFooter className="p-0 pt-6 flex justify-end">
              <Button type="submit" className="btn-primary" disabled={isLoading || isCategoryLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} 
                {isLoading ? 'Salvando...' : 'Salvar Produto'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminNewProductPage;