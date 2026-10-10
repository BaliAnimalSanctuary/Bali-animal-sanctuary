document.addEventListener('DOMContentLoaded', function () {

    /* ===== GANTI DATA INI ===== */
    var ACCOUNT_NAME = 'Bali Animal Sanctuary';
    var ACCOUNT_NUMBER = '7611505195';
    var WHATSAPP = '6281234567890';

    // Username PayPal.me TANPA spasi (cek di paypal.me/username-kamu)
    var PAYPAL_ME = 'BaliAnimalSanctuary';

    // ATAU pakai link donate penuh dari PayPal Dashboard (lebih stabil)
    // Jika diisi, PAYPAL_ME diabaikan
    var PAYPAL_DONATE_URL = '';
    // contoh: 'https://www.paypal.com/donate/?hosted_button_id=XXXXXXXX'
    /* ========================= */

    var amount = 100000;
    var method = 'card';
    var MIN_AMOUNT = 10000;

    var amtBtns = document.querySelectorAll('.bawa-amt');
    var customInput = document.getElementById('bawaCustom');
    var btnAmount = document.getElementById('bawaBtnAmount');
    var tabs = document.querySelectorAll('.bawa-tab');
    var panels = {
        card: document.getElementById('panelCard'),
        transfer: document.getElementById('panelTransfer'),
        paypal: document.getElementById('panelPaypal')
    };
    var donateBtn = document.getElementById('bawaDonateBtn');
    var copyBtn = document.getElementById('bawaCopyBtn');
    var copyMsg = document.getElementById('bawaCopyMsg');
    var success = document.getElementById('bawaSuccess');
    var successClose = document.getElementById('bawaSuccessClose');
    var payLink = document.getElementById('bawaPayLink');
    var paypalBtn = document.getElementById('bawaPaypalBtn');
    var accName = document.getElementById('bawaAccName');
    var accNumber = document.getElementById('bawaAccNumber');
    var cardNumber = document.getElementById('bawaCardNumber');
    var cardExpiry = document.getElementById('bawaExpiry');
    var cardCvc = document.getElementById('bawaCvc');
    var cardName = document.getElementById('bawaCardName');

    if (accName) accName.textContent = ACCOUNT_NAME;
    if (accNumber) accNumber.textContent = ACCOUNT_NUMBER;

    function formatRp(n) {
        return 'Rp' + Number(n).toLocaleString('id-ID');
    }

    function setAmount(n) {
        amount = n;
        if (btnAmount) btnAmount.textContent = formatRp(n);
    }

    function getPaypalUrl() {
        // Prioritas: link donate resmi
        if (PAYPAL_DONATE_URL && PAYPAL_DONATE_URL.length > 5) {
            return PAYPAL_DONATE_URL;
        }
        // PayPal.me — username tanpa spasi
        var username = (PAYPAL_ME || '').replace(/\s+/g, '');
        if (!username) {
            alert('PayPal belum dikonfigurasi. Isi PAYPAL_ME atau PAYPAL_DONATE_URL di donatepay.js');
            return null;
        }
        // Estimasi IDR → USD (± Rp16.000 = 1 USD)
        var usd = Math.max(1, Math.round(amount / 16000));
        return 'https://www.paypal.me/' + username + '/' + usd + 'USD';
    }

    function openWA(extra) {
        var msg =
            'Halo Bali Animal Sanctuary 🐾\n\n' +
            'Saya ingin berdonasi *' + formatRp(amount) + '*.\n\n' +
            'Bank: BCA\nNo. Rek: ' + ACCOUNT_NUMBER + '\nA/N: ' + ACCOUNT_NAME + '\n\n' +
            (extra || '') +
            'Mohon konfirmasi. Terima kasih!';
        window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank');
    }

    function showSuccess() {
        if (success) success.hidden = false;
    }

    function openPaypal() {
        if (amount < MIN_AMOUNT) {
            alert('Minimum donasi ' + formatRp(MIN_AMOUNT));
            return;
        }
        var url = getPaypalUrl();
        if (!url) return;
        window.open(url, '_blank');
        showSuccess();
    }

    /* Amount buttons */
    amtBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            amtBtns.forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            if (customInput) customInput.value = '';
            setAmount(Number(btn.dataset.amount));
        });
    });

    if (customInput) {
        customInput.addEventListener('input', function () {
            var v = Number(customInput.value);
            if (v > 0) {
                amtBtns.forEach(function (b) {
                    b.classList.remove('active');
                });
                setAmount(v);
            }
        });
    }

    /* Tabs */
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) {
                t.classList.remove('active');
            });
            tab.classList.add('active');
            method = tab.dataset.method;
            Object.keys(panels).forEach(function (k) {
                if (panels[k]) panels[k].classList.toggle('active', k === method);
            });
        });
    });

    /* Copy rekening */
    if (copyBtn) {
        copyBtn.addEventListener('click', async function () {
            try {
                await navigator.clipboard.writeText(ACCOUNT_NUMBER);
            } catch (e) {
                var t = document.createElement('input');
                t.value = ACCOUNT_NUMBER;
                document.body.appendChild(t);
                t.select();
                document.execCommand('copy');
                document.body.removeChild(t);
            }
            if (copyMsg) {
                copyMsg.hidden = false;
                setTimeout(function () {
                    copyMsg.hidden = true;
                }, 2000);
            }
        });
    }

    /* Format kartu */
    if (cardNumber) {
        cardNumber.addEventListener('input', function () {
            var v = cardNumber.value.replace(/\D/g, '').slice(0, 16);
            cardNumber.value = v.replace(/(.{4})/g, '$1 ').trim();
        });
    }
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function () {
            var v = cardExpiry.value.replace(/\D/g, '').slice(0, 4);
            if (v.length >= 3) v = v.slice(0, 2) + ' / ' + v.slice(2);
            cardExpiry.value = v;
        });
    }
    if (cardCvc) {
        cardCvc.addEventListener('input', function () {
            cardCvc.value = cardCvc.value.replace(/\D/g, '').slice(0, 4);
        });
    }

    /* Pay with link (WA share) */
    if (payLink) {
        payLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (amount < MIN_AMOUNT) return alert('Minimum donasi ' + formatRp(MIN_AMOUNT));
            var msg =
                'Bantu donasi Bali Animal Sanctuary 🐾\n\n' +
                'Nominal: *' + formatRp(amount) + '*\n\n' +
                'Transfer BCA: ' + ACCOUNT_NUMBER + '\nA/N: ' + ACCOUNT_NAME;
            window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
        });
    }

    /* Tombol PayPal di panel */
    if (paypalBtn) {
        paypalBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openPaypal();
        });
    }

    /* Tombol Donate utama */
    if (donateBtn) {
        donateBtn.addEventListener('click', function () {
            if (amount < MIN_AMOUNT) return alert('Minimum donasi ' + formatRp(MIN_AMOUNT));

            if (method === 'card') {
                var num = (cardNumber && cardNumber.value.replace(/\s/g, '')) || '';
                var name = (cardName && cardName.value.trim()) || '';
                var exp = (cardExpiry && cardExpiry.value) || '';
                var cvc = (cardCvc && cardCvc.value) || '';
                if (num.length < 15 || !name || exp.length < 4 || cvc.length < 3) {
                    return alert('Please complete card details.');
                }
                openWA('Metode: Kartu (nama: ' + name + ')\n');
                showSuccess();
            } else if (method === 'paypal') {
                openPaypal();
            } else {
                openWA('Metode: Transfer BCA\n');
                showSuccess();
            }
        });
    }

    if (successClose) {
        successClose.addEventListener('click', function () {
            if (success) success.hidden = true;
        });
    }

    setAmount(100000);
});