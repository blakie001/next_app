const ProductsList = ({ products }) => {
  return (
    <div className="row">
      {products.map((product, index) => (
        <div key={index} className="col-md-4 mb-4">
          <div className="card h-100 shadow">
            <div className="card-body">
              <h2 className="card-title text-success">{product.name}</h2>
              <p className="card-text">{product.description}</p>
              <a
                href={product.link}
                className="btn btn-outline-success"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;