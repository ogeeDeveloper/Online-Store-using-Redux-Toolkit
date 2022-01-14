import ProductItem from './ProductItem';
import classes from './Products.module.css';

const products = [
  {id:"p1", price: 600, title: 'Learing Redux', description: "This teaches about Redux Toolkit"},
  {id:"p2", price: 1000, title: 'Learing JavaScript', description: "This teaches about JavaScript"},
  {id:"p3", price: 700, title: 'Learing React', description: "This teaches about React"},
  {id:"p4", price: 500, title: 'Learing NextJS', description: "This teaches about NextJS"},
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map(product=>(
          <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />
        ))}
      </ul>
    </section>
  );
};

export default Products;
