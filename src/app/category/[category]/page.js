import BreadcrumbNavigate from '@/shared/components/BreadcrumbNavigate';
import Products from '@/features/category/components/Products';
import React from 'react'

const Category = async ({ params }) => {
  const { category } = await params;
  return (
    <section>
      <h1 className='sr-only'>{category} category</h1>
      <BreadcrumbNavigate category={category} />
      <Products category={category} />
    </section>
  )
}

export default Category