import styles from "./Input.module.css";

export const Input = ({ type, id, name, placeholder, value, onChange }) => {
  return (
    <input
      className={styles.input}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
