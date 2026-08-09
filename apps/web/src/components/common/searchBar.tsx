interface SearchBarProps {
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
}

export default function SearchBar({
    value,
    placeholder,
    onChange,
}: SearchBarProps) {

    return (

        <input
            className="border rounded-lg p-3 w-full mb-6"
            placeholder={placeholder}
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
        />

    );

}