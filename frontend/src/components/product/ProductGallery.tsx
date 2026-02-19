import { products } from "../../data/mockData";

export function ProductGallery() {
  const images = products.slice(0, 4).map((product) => product.image);

  return (
    <section className="card">
      <img className="gallery-main" src={images[0]} alt="Main product" />
      <div className="thumb-row">
        {images.map((image, index) => (
          <img key={`${image}-${index}`} src={image} alt={`Product thumbnail ${index + 1}`} />
        ))}
      </div>
    </section>
  );
}
