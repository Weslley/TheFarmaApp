export const parseFloat = (value) => {
    return (parseFloat(value.replace(/\D/g, "")) / 100).toFixed(2);
}