const ServicesList = ({ services }) => {
  return (
    <div className="row">
      {services.map((service, index) => (
        <div key={index} className="col-md-6 mb-4">
          <div className="card h-100 shadow">
            <div className="card-body">
              <h2 className="card-title text-primary">{service.category}</h2>
              <p className="card-text">{service.description}</p>
              <div className="mt-3">
                {service.sub_services.map((sub, idx) => (
                  <div key={idx} className="mb-3">
                    <h5 className="text-secondary">{sub.name}</h5>
                    {sub.technologies && (
                      <p className="text-muted">Technologies: {sub.technologies.join(', ')}</p>
                    )}
                    <p className="text-muted">{sub.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesList;