const { numberToChinese } = require('./popup');

describe('calculate function', () => {
    test('calculates correctly for 10000', () => {
        const contractAmount = 10000;
        const taxRate = 0.13; // 13%
        const ratios = [0.3, 0.7]; // 30% and 70%

        const result = calculate(contractAmount, taxRate, ratios);

        // 检查总结信息
        expect(result.summary.contractAmount).toBe('10000.00');
        expect(result.summary.contractAmountChinese).toBe('壹万元整');
        expect(result.summary.taxedAmount).toBe('8849.56');
        expect(result.summary.taxedAmountChinese).toBe('捌仟捌佰肆拾玖元伍角陆分');
        expect(result.summary.taxAmount).toBe('1150.44');
        expect(result.summary.taxAmountChinese).toBe('壹仟壹佰伍拾元肆角肆分');

        // 检查详细结果
        expect(result.results).toHaveLength(2);

        // 检查第一个比例 (30%)
        expect(result.results[0].ratio).toBe('30.00%');
        expect(result.results[0].amount).toBe('3000.00');
        expect(result.results[0].taxedAmount).toBe('2654.87');
        expect(result.results[0].taxAmount).toBe('345.13');
        expect(result.results[0].chineseAmount).toBe('贰仟陆佰伍拾肆元捌角柒分');
        expect(result.results[0].chineseTaxAmount).toBe('叁佰肆拾伍元壹角叁分');

        // 检查第二个比例 (70%)
        expect(result.results[1].ratio).toBe('70.00%');
        expect(result.results[1].amount).toBe('7000.00');
        expect(result.results[1].taxedAmount).toBe('6194.69');
        expect(result.results[1].taxAmount).toBe('805.31');
        expect(result.results[1].chineseAmount).toBe('陆仟壹佰玖拾肆元陆角玖分');
        expect(result.results[1].chineseTaxAmount).toBe('捌佰零伍元叁角壹分');
    });
});
