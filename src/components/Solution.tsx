import GridAnimatedCards from './grid-animated-cards';

const Solution = () => {
  return (
    <section className="solution" id="solution">
      <div className="container">
        <div className="section-header">
          <div className="section-tag fade-up">The Product</div>
          <h2 className="section-title fade-up fade-up-delay-1">
            The Process <span className="gradient-text-purple">Is the Product</span>
          </h2>
          <p className="section-body fade-up fade-up-delay-2">
            We don't give you another tool that doesn't understand your agency. We help you design, build, and run a fully managed Agent-Native operational layer - tailored to your process and your strengths.
          </p>
        </div>

        <div className="">
          <GridAnimatedCards />
        </div>
      </div>
    </section>
  );
};

export default Solution;
