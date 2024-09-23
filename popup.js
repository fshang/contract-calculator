let ratioCount = 1;

function addRatioInput() {
    ratioCount++;
    const newRatio = document.createElement('div');
    newRatio.className = 'input-group';
    newRatio.innerHTML = `
        <label for="paymentRatio${ratioCount}">付款比例 ${ratioCount}：</label>
        <input type="number" class="paymentRatio" step="0.01" min="0" max="100">%
    `;
    document.getElementById('paymentRatios').appendChild(newRatio);
}

function numberToChinese(num) {
    const units = ['', '万', '亿', '兆'];
    const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const positions = ['', '拾', '佰', '仟'];
    
    // 处理整数部分
    function integerToChinese(n) {
        let result = '';
        let unitIndex = 0;
        let prevZero = false;
        
        while (n > 0) {
            let section = n % 10000;
            let sectionStr = '';
            
            for (let i = 0; i < 4; i++) {
                const digit = section % 10;
                if (digit === 0) {
                    if (!prevZero && sectionStr !== '') {
                        sectionStr = '零' + sectionStr;
                        prevZero = true;
                    }
                } else {
                    sectionStr = digits[digit] + positions[i] + sectionStr;
                    prevZero = false;
                }
                section = Math.floor(section / 10);
            }
            
            if (sectionStr !== '') {
                if (unitIndex > 0 && sectionStr === '壹') {
                    sectionStr = ''; // 处理一万、一亿等情况
                }
                result = sectionStr + units[unitIndex] + result;
                prevZero = false;
            } else if (unitIndex > 0 && result !== '') {
                prevZero = true;
            }
            
            unitIndex++;
            n = Math.floor(n / 10000);
        }
        
        return result || '零';
    }

    // 处理小数部分
    function decimalToChinese(n) {
        let result = '';
        for (let i = 0; i < n.length; i++) {
            if (n[i] !== '0') {
                result += digits[parseInt(n[i])] + (i === 0 ? '角' : '分');
            } else if (result !== '' || i === 0) {
                result += '零';
            }
        }
        return result;
    }

    const [integer, decimal] = num.toFixed(2).split('.');
    let result = integerToChinese(parseInt(integer));
    
    // 移除开头的"零"
    while (result.startsWith('零')) {
        result = result.slice(1);
    }
    
    // 处理整数部分为零的情况
    if (result === '') {
        result = '零';
    }
    
    result += '元';
    
    if (decimal === '00') {
        result += '整';
    } else {
        const decimalChinese = decimalToChinese(decimal);
        if (decimalChinese === '零') {
            result += '整';
        } else {
            result += decimalChinese;
        }
    }

    return result;
}

function calculate() {
    const contractAmount = parseFloat(document.getElementById('contractAmount').value);
    const taxRate = parseFloat(document.getElementById('taxRate').value) / 100; // 将百分比转换为小数
    const ratios = Array.from(document.getElementsByClassName('paymentRatio')).map(input => parseFloat(input.value) / 100);

    if (isNaN(contractAmount) || isNaN(taxRate) || ratios.some(isNaN)) {
        alert('请输入有效的数字');
        return;
    }

    const taxedAmount = contractAmount / (1 + taxRate);
    const taxAmount = contractAmount - taxedAmount;

    let resultHTML = `
    <div class="summary">
        <p>合同金额：${contractAmount.toFixed(2)} (${numberToChinese(contractAmount)})</p>
        <p>含税金额：${taxedAmount.toFixed(2)} (${numberToChinese(taxedAmount)})</p>
        <p>税额：${taxAmount.toFixed(2)} (${numberToChinese(taxAmount)})</p>
    </div>
    <table>
        <tr>
            <th>付款比例</th>
            <th>金额</th>
            <th>税后金额</th>
            <th>税额</th>
            <th>税后金额（大写）</th>
            <th>税额（大写）</th>
        </tr>
    `;

    const results = ratios.map(ratio => {
        const amount = contractAmount * ratio;
        const taxedAmount = amount / (1 + taxRate);
        const taxAmount = amount - taxedAmount;
        return {
            ratio: (ratio * 100).toFixed(2) + '%',
            amount: amount.toFixed(2),
            taxedAmount: taxedAmount.toFixed(2),
            taxAmount: taxAmount.toFixed(2),
            chineseAmount: numberToChinese(taxedAmount),
            chineseTaxAmount: numberToChinese(taxAmount)
        };
    });

    results.forEach(result => {
        resultHTML += `<tr>
            <td>${result.ratio}</td>
            <td>${result.amount}</td>
            <td>${result.taxedAmount}</td>
            <td>${result.taxAmount}</td>
            <td>${result.chineseAmount}</td>
            <td>${result.chineseTaxAmount}</td>
        </tr>`;
    });
    resultHTML += '</table>';

    document.getElementById('result').innerHTML = resultHTML;
    document.getElementById('export').style.display = 'inline-block';
}

function exportResults() {
    const result = document.getElementById('result').innerText;
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = '合同金额计算结果.txt';
    a.click();
}

document.getElementById('addRatio').addEventListener('click', addRatioInput);
document.getElementById('calculate').addEventListener('click', calculate);
document.getElementById('export').addEventListener('click', exportResults);
