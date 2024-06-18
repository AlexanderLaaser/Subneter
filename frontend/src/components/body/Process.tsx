function Process() {
  return (
    <div className="flex steps">
      <div className="flex-1 step step-primary">Define address spaces</div>
      <div className="flex-1 step step-primary">Calculate subnets</div>
      <div className="flex-1 step step-neutral before:!bg-black">
        Store configurations
      </div>
      <div className="flex-1 step step-neutral">Deploy to infrastructure</div>
    </div>
  );
}

export default Process;
