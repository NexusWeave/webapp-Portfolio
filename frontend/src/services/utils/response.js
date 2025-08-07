export const fetchData = async (argument) =>
{
    return new Promise(resolve => {
        setTimeout(() => {resolve(argument);}, 10);
    })
}