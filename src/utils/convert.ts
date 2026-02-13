const convert = {
    IDR(angka: number) {
        const rupiah = new Intl.NumberFormat('id-ID', {
            style: "currency",
            currency: "IDR",
        }).format(angka);

        return rupiah;
    }
}

export default convert;