function TagSelector({
  tags,
  selectedTags,
  onChange,
}: {
  tags: string[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          style={{
            backgroundColor: selectedTags.includes(tag)
              ? "rgba(255,255,255,0.5)"
              : "rgba(255,255,255,0.15)",
          }}
          className="text-xs text-white py-1 px-2 rounded cursor-pointer"
          onClick={() => {
            if (selectedTags.includes(tag))
              onChange(selectedTags.filter((t) => t !== tag));
            else onChange([...selectedTags, tag]);
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default TagSelector;
