import tinycolor from 'tinycolor2';

const colorPalette = (color, index, formatFunctionName = 'toHexString') => {
    const hueStep = 2,
        saturationStep = 0.16,
        saturationStep2 = 0.05,
        brightnessStep1 = 0.05,
        brightnessStep2 = 0.15,
        lightColorCount = 5,
        darkColorCount = 4;

    const getHue = function (hsv, i, isLight) {
        let hue;
        if (hsv.h >= 60 && hsv.h <= 240) {
            hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i;
        } else {
            hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i;
        }
        if (hue < 0) {
            hue += 360;
        } else if (hue >= 360) {
            hue -= 360;
        }
        return Math.round(hue);
    };
    const getSaturation = function (hsv, i, isLight) {
        let saturation;
        if (isLight) {
            saturation = hsv.s - saturationStep * i;
        } else if (i === darkColorCount) {
            saturation = hsv.s + saturationStep;
        } else {
            saturation = hsv.s + saturationStep2 * i;
        }
        if (saturation > 1) {
            saturation = 1;
        }
        if (isLight && i === lightColorCount && saturation > 0.1) {
            saturation = 0.1;
        }
        if (saturation < 0.06) {
            saturation = 0.06;
        }
        return Number(saturation.toFixed(2));
    };
    const getValue = function (hsv, i, isLight) {
        let value;
        if (isLight) {
            value = hsv.v + brightnessStep1 * i;
        } else {
            value = hsv.v - brightnessStep2 * i
        }
        if (value > 1) {
            value = 1;
        }
        return Number(value.toFixed(2))
    };

    const isLight = index <= 6;
    if (index === 6) {
        // 正常 ===6 的时候数值会差一点，这里做了一个修正
        return tinycolor(color)[formatFunctionName]();
    }
    const hsv = tinycolor(color).toHsv();
    const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;
    return tinycolor({
        h: getHue(hsv, i, isLight),
        s: getSaturation(hsv, i, isLight),
        v: getValue(hsv, i, isLight),
    })[formatFunctionName]();
};

export default colorPalette;