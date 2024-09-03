type Props = {
  text: string;
  progress: number;
};

const ProgressBar = ({ text, progress }: Props) => {
  return (
    <div>
      <div className="mb-1 flex justify-between">
        <span className="text-base font-medium">{text}</span>
        <span className="text-sm font-medium">{progress} %</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-color-inactive">
        <div
          className={`h-2.5 rounded-full bg-color-accent-secondary`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
