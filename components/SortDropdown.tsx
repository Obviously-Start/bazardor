"use client";

type SortType = "default" | "low" | "high";

type SortingDropdownProps = {
  value: SortType;
  onChange: (value: SortType) => void;
};

export default function SortingDropdown({
  value,
  onChange,
}: SortingDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort"
        className="text-[10px] text-base-content/55"
      >
        সাজান
      </label>

      <select
        id="sort"
        value={value}
        onChange={(e) =>
          onChange(e.target.value as SortType)
        }
        className="select select-bordered select-xs text-[10px]"
      >
        <option value="default">
          ডিফল্ট
        </option>

        <option value="low">
          কম দাম থেকে বেশি
        </option>

        <option value="high">
          বেশি দাম থেকে কম
        </option>
      </select>
    </div>
  );
}