import styles from './JudgeInfo.module.css';

export default function JudgeInfo({
  judgeName,
  judgeEmail,
  checked,
  onCheckChange,
}) {
  return (
    <div className="flex gap-3 w-[50%]">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onCheckChange}
          className={`h-5 w-5 accent-[#BAE627] ${styles.checkbox}`}
        />
      </div>
      <div className="flex flex-col">
        <div className="font-medium">
          <em>{judgeName}</em>
        </div>
        <div className="text-[797979]">
          <em>{judgeEmail}</em>
        </div>
      </div>
    </div>
  );
}
