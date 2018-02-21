const isProduction = () => process.env.NODE_ENV === "production";
const isTesting = () => process.env.NODE_ENV === "testing";
const isDevelopment = () => !isProduction() && !isTesting();

export {
    isProduction,
    isTesting,
    isDevelopment
};
