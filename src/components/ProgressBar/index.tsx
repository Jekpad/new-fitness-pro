type Props = {
  text: string;
  progress: number;
};

const ProgressBar = ({ text, progress }: Props) => {
  let displayProgress = progress < 0 ? 0 : progress;
  displayProgress = progress > 100 ? 100 : displayProgress;
  return (
    <div>
      <div className="mb-1 flex justify-between gap-[2px]">
        <span className="text-base font-medium">{text}</span>
        <span className="text-sm font-medium">{displayProgress}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-color-inactive">
        <div
          className={`h-2.5 rounded-full bg-color-accent-secondary`}
          style={{ width: `${displayProgress}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
