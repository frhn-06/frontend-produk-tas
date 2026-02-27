const convert = {
    IDR(angka: number) {
        const rupiah = new Intl.NumberFormat('id-ID', {
            style: "currency",
            currency: "IDR",
        }).format(angka);

        return rupiah;
    },

    time(waktuAwal: string) {
        const now = new Date();
        const waktuUpload = new Date(waktuAwal);

        const selisih = Math.floor((now.getTime() - waktuUpload.getTime()) / 1000);

        const autoFormat = new Intl.RelativeTimeFormat("id", { numeric: "auto" });

        const menit = Math.floor(selisih / 60);
        const jam = Math.floor(selisih / 3600);
        const hari = Math.floor(selisih / 86400);
        const minggu = Math.floor(selisih / 604800);

        if (selisih < 3600) {
            return autoFormat.format(-menit, "minute");
        }

        if (selisih < 86400) {
            return autoFormat.format(-jam, "hour");
        }

        if (selisih < 604800) {
            return autoFormat.format(-hari, "day");
        }

        if (selisih < 2592000) {
            return autoFormat.format(-minggu, "week");
        }

        return waktuUpload.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }
}

export default convert;