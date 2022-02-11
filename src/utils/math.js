export const clamp = (value, minValue, maxValue) => {
    return Math.min(Math.max(value, minValue), maxValue);
}

export const lerp = (start, end, amt) => {
    return (1.0 - amt) * start + amt * end;
}
