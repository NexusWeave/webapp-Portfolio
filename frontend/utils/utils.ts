export function generateHexID()
{    
    const ch: string = '0123456789abcdef';
    
    let result: string = '';
    const n: number = ch.length;
    for (let i = 0; i < n; i++) result += ch.charAt(Math.floor(Math.random() * n));

    return result;
}

export function next(arr: Array<Record<string, any>>)
    {

        const n = arr.length;
        if (n <= 1) return;

        // Iterate through the array
        for (let i = 0; i < n; i++)
        {
            const length = n - 1;
            const source = arr[i];

            const j = i == length ? 0 : i + 1;
            const target = arr[j];

            //  Swap the visibility
            if (source.isVisible)
            {
                const temp: boolean = source.isVisible;
                source.isVisible = target.isVisible;
                target.isVisible = temp;
                break;
            }

        }
        //console.log(arr);
    };

export function startTimer(arr: Array<Record<string, any>>)
    {
        //  Set the interval
        const n = 10000;

        //  Start the timer
        setInterval(() => next(arr), n);
    };