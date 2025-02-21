const ResearchList = ({ research }) => {
  return (
    <div className="row">
      {research.map((item, index) => (
        <div key={index} className="col-md-6 mb-4">
          <div className="card h-100 shadow">
            <div className="card-body">
              <h2 className="card-title text-info">{item.title}</h2>
              <p className="text-muted">{item.year} - {item.type}</p>
              <p className="card-text">{item.description}</p>
              <a
                href={item.doi}
                className="btn btn-outline-info"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResearchList;