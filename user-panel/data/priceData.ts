import { PriceRecord } from '../types';

const regionMap: { [key: string]: string } = {
    '01': 'DKI Jakarta', '02': 'Jawa Barat', '03': 'Jawa Tengah', '04': 'DI Yogyakarta',
    '05': 'Jawa Timur', '06': 'Papua', '07': 'Papua Barat', '08': 'Sulawesi Selatan'
};

const rawPriceData = `
NO.	PRODUK	KODE BARANG	KODE WILAYAH	KATEGORI	SATUAN	HARGA MINIMUM	HARGA MAKSIMUM
1	"Laptop (Core i5, RAM 8GB, SSD 256GB, 14"")"	BM1	01	Biaya Operasional	Unit	8500000	15000000
2	"PC All-in-One (Core i5, RAM 8GB, 21.5"")"	BM2	01	Biaya Operasional	Unit	9000000	16000000
3	Printer Inkjet All-in-One (Print, Scan, Copy)	BM3	01	Biaya Operasional	Unit	2500000	4500000
4	Meja Kerja (Partikel Board, 120x60 cm)	BM4	01	Biaya Operasional	Unit	800000	1500000
5	Kursi Kerja (Hidrolik, Jaring)	BM5	01	Biaya Operasional	Unit	600000	1200000
6	Lemari Arsip (Besi, 2 Pintu)	BM6	01	Biaya Operasional	Unit	1800000	3000000
7	Mobil Penumpang (MPV 1300cc, ex: Avanza 1.3 E)	BM7	01	Biaya Operasional	Unit	245000000	265000000
8	Sepeda Motor (Matic 125cc, ex: Vario 125)	BM8	01	Biaya Operasional	Unit	23000000	25000000
9	Genset Portable (10 KVA, Diesel, Silent)	BM9	01	Biaya Operasional	Unit	38000000	55000000
10	AC Split (1 PK, Standard)	BM10	01	Biaya Operasional	Unit	3500000	5000000
11	Semen Portland (PCC, 50 kg)	BM11	01	Bahan Baku	Sak	60000	75000
12	Aspal Curah (Aspal Goreng)	BM12	01	Bahan Baku	Kg	29000	35000
13	Pasir Beton	BM13	01	Bahan Baku	m3	300000	380000
14	Kaca Polos (Tebal 5 mm)	BM14	01	Bahan Baku	m2	105000	130000
15	Baja Ringan (Profil C, 0.75mm)	BM15	01	Bahan Baku	Batang (6m)	80000	110000
16	Cat Tembok Eksterior (Weather-resistant, 20L)	BM16	01	Bahan Baku	Pail	1500000	2500000
17	Pipa PVC (4 inch, Tipe AW, per 4m)	BM17	01	Bahan Baku	Batang	120000	180000
18	Kamera DSLR (Entry-level, 24MP, kit lens)	BM18	01	Biaya Operasional	Unit	7000000	10000000
19	Proyektor LCD (3000 Lumens, XGA)	BM19	01	Biaya Operasional	Unit	5000000	8000000
20	Mesin Fotokopi (Medium speed, A3, DADF)	BM20	01	Biaya Operasional	Unit	40000000	70000000
21	"Laptop (Core i5, RAM 8GB, SSD 256GB, 14"")"	BM1	02	Biaya Operasional	Unit	8000000	14000000
22	"PC All-in-One (Core i5, RAM 8GB, 21.5"")"	BM2	02	Biaya Operasional	Unit	8500000	15000000
23	Printer Inkjet All-in-One (Print, Scan, Copy)	BM3	02	Biaya Operasional	Unit	2300000	4200000
24	Meja Kerja (Partikel Board, 120x60 cm)	BM4	02	Biaya Operasional	Unit	750000	1400000
25	Kursi Kerja (Hidrolik, Jaring)	BM5	02	Biaya Operasional	Unit	550000	1100000
26	Lemari Arsip (Besi, 2 Pintu)	BM6	02	Biaya Operasional	Unit	1700000	2800000
27	Mobil Penumpang (MPV 1300cc, ex: Avanza 1.3 E)	BM7	02	Biaya Operasional	Unit	235000000	255000000
28	Sepeda Motor (Matic 125cc, ex: Vario 125)	BM8	02	Biaya Operasional	Unit	22000000	24000000
29	Genset Portable (10 KVA, Diesel, Silent)	BM9	02	Biaya Operasional	Unit	37000000	54000000
30	AC Split (1 PK, Standard)	BM10	02	Biaya Operasional	Unit	3200000	4800000
31	Semen Portland (PCC, 50 kg)	BM11	02	Bahan Baku	Sak	58900	72500
32	Aspal Curah (Aspal Goreng)	BM12	02	Bahan Baku	Kg	28300	34000
33	Pasir Beton	BM13	02	Bahan Baku	m3	293400	370000
34	Kaca Polos (Tebal 5 mm)	BM14	02	Bahan Baku	m2	99700	125000
35	Baja Ringan (Profil C, 0.75mm)	BM15	02	Bahan Baku	Batang (6m)	75000	105000
36	Cat Tembok Eksterior (Weather-resistant, 20L)	BM16	02	Bahan Baku	Pail	1400000	2300000
37	Pipa PVC (4 inch, Tipe AW, per 4m)	BM17	02	Bahan Baku	Batang	110000	170000
38	Kamera DSLR (Entry-level, 24MP, kit lens)	BM18	02	Biaya Operasional	Unit	6500000	9500000
39	Proyektor LCD (3000 Lumens, XGA)	BM19	02	Biaya Operasional	Unit	4500000	7500000
40	Mesin Fotokopi (Medium speed, A3, DADF)	BM20	02	Biaya Operasional	Unit	38000000	65000000
41	"Laptop (Core i5, RAM 8GB, SSD 256GB, 14"")"	BM1	03	Biaya Operasional	Unit	8500000	15000000
42	"PC All-in-One (Core i5, RAM 8GB, 21.5"")"	BM2	03	Biaya Operasional	Unit	9000000	16000000
43	Printer Inkjet All-in-One (Print, Scan, Copy)	BM3	03	Biaya Operasional	Unit	2500000	4500000
44	Meja Kerja (Partikel Board, 120x60 cm)	BM4	03	Biaya Operasional	Unit	800000	1500000
45	Kursi Kerja (Hidrolik, Jaring)	BM5	03	Biaya Operasional	Unit	600000	1200000
46	Lemari Arsip (Besi, 2 Pintu)	BM6	03	Biaya Operasional	Unit	1800000	3000000
47	Mobil Penumpang (MPV 1300cc, ex: Avanza 1.3 E)	BM7	03	Biaya Operasional	Unit	245000000	265000000
48	Sepeda Motor (Matic 125cc, ex: Vario 125)	BM8	03	Biaya Operasional	Unit	23000000	25000000
49	Genset Portable (10 KVA, Diesel, Silent)	BM9	03	Biaya Operasional	Unit	38000000	55000000
50	AC Split (1 PK, Standard)	BM10	03	Biaya Operasional	Unit	3500000	5000000
51	Semen Portland (PCC, 50 kg)	BM11	03	Bahan Baku	Sak	62000	78000
52	Aspal Curah (Aspal Goreng)	BM12	03	Bahan Baku	Kg	30000	36000
53	Pasir Beton	BM13	03	Bahan Baku	m3	320000	400000
54	Kaca Polos (Tebal 5 mm)	BM14	03	Bahan Baku	m2	110000	135000
55	Baja Ringan (Profil C, 0.75mm)	BM15	03	Bahan Baku	Batang (6m)	85000	115000
56	Cat Tembok Eksterior (Weather-resistant, 20L)	BM16	03	Bahan Baku	Pail	1500000	2500000
57	Pipa PVC (4 inch, Tipe AW, per 4m)	BM17	03	Bahan Baku	Batang	125000	185000
58	Kamera DSLR (Entry-level, 24MP, kit lens)	BM18	03	Biaya Operasional	Unit	7000000	10000000
59	Proyektor LCD (3000 Lumens, XGA)	BM19	03	Biaya Operasional	Unit	5000000	8000000
60	Mesin Fotokopi (Medium speed, A3, DADF)	BM20	03	Biaya Operasional	Unit	40000000	70000000
61	"Laptop (Core i5, RAM 8GB, SSD 256GB, 14"")"	BM1	04	Biaya Operasional	Unit	9000000	16000000
62	"PC All-in-One (Core i5, RAM 8GB, 21.5"")"	BM2	04	Biaya Operasional	Unit	9500000	17000000
63	Printer Inkjet All-in-One (Print, Scan, Copy)	BM3	04	Biaya Operasional	Unit	2700000	4800000
64	Meja Kerja (Partikel Board, 120x60 cm)	BM4	04	Biaya Operasional	Unit	900000	1700000
65	Kursi Kerja (Hidrolik, Jaring)	BM5	04	Biaya Operasional	Unit	700000	1400000
66	Lemari Arsip (Besi, 2 Pintu)	BM6	04	Biaya Operasional	Unit	2000000	3300000
67	Mobil Penumpang (MPV 1300cc, ex: Avanza 1.3 E)	BM7	04	Biaya Operasional	Unit	250000000	270000000
68	Sepeda Motor (Matic 125cc, ex: Vario 125)	BM8	04	Biaya Operasional	Unit	24000000	26000000
69	Genset Portable (10 KVA, Diesel, Silent)	BM9	04	Biaya Operasional	Unit	40000000	58000000
70	AC Split (1 PK, Standard)	BM10	04	Biaya Operasional	Unit	3800000	5500000
71	Semen Portland (PCC, 50 kg)	BM11	04	Bahan Baku	Sak	65000	82000
72	Aspal Curah (Aspal Goreng)	BM12	04	Bahan Baku	Kg	32000	38000
73	Pasir Beton	BM13	04	Bahan Baku	m3	350000	440000
74	Kaca Polos (Tebal 5 mm)	BM14	04	Bahan Baku	m2	120000	150000
75	Baja Ringan (Profil C, 0.75mm)	BM15	04	Bahan Baku	Batang (6m)	95000	130000
76	Cat Tembok Eksterior (Weather-resistant, 20L)	BM16	04	Bahan Baku	Pail	1700000	2800000
77	Pipa PVC (4 inch, Tipe AW, per 4m)	BM17	04	Bahan Baku	Batang	140000	210000
78	Kamera DSLR (Entry-level, 24MP, kit lens)	BM18	04	Biaya Operasional	Unit	7500000	11000000
79	Proyektor LCD (3000 Lumens, XGA)	BM19	04	Biaya Operasional	Unit	5500000	9000000
80	Mesin Fotokopi (Medium speed, A3, DADF)	BM20	04	Biaya Operasional	Unit	45000000	75000000
81	"Laptop (Core i5, RAM 8GB, SSD 256GB, 14"")"	BM1	05	Biaya Operasional	Unit	9000000	16000000
82	"PC All-in-One (Core i5, RAM 8GB, 21.5"")"	BM2	05	Biaya Operasional	Unit	9500000	17000000
83	Printer Inkjet All-in-One (Print, Scan, Copy)	BM3	05	Biaya Operasional	Unit	2700000	4800000
84	Meja Kerja (Partikel Board, 120x60 cm)	BM4	05	Biaya Operasional	Unit	900000	1700000
85	Kursi Kerja (Hidrolik, Jaring)	BM5	05	Biaya Operasional	Unit	700000	1400000
86	Lemari Arsip (Besi, 2 Pintu)	BM6	05	Biaya Operasional	Unit	2000000	3300000
87	Mobil Penumpang (MPV 1300cc, ex: Avanza 1.3 E)	BM7	05	Biaya Operasional	Unit	250000000	270000000
88	Sepeda Motor (Matic 125cc, ex: Vario 125)	BM8	05	Biaya Operasional	Unit	24000000	26000000
89	Genset Portable (10 KVA, Diesel, Silent)	BM9	05	Biaya Operasional	Unit	40000000	58000000
90	AC Split (1 PK, Standard)	BM10	05	Biaya Operasional	Unit	3800000	5500000
91	Semen Portland (PCC, 50 kg)	BM11	05	Bahan Baku	Sak	65000	82000
92	Aspal Curah (Aspal Goreng)	BM12	05	Bahan Baku	Kg	32000	38000
93	Pasir Beton	BM13	05	Bahan Baku	m3	350000	440000
94	Kaca Polos (Tebal 5 mm)	BM14	05	Bahan Baku	m2	120000	150000
95	Baja Ringan (Profil C, 0.75mm)	BM15	05	Bahan Baku	Batang (6m)	95000	130000
96	Cat Tembok Eksterior (Weather-resistant, 20L)	BM16	05	Bahan Baku	Pail	1700000	2800000
97	Pipa PVC (4 inch, Tipe AW, per 4m)	BM17	05	Bahan Baku	Batang	140000	210000
98	Kamera DSLR (Entry-level, 24MP, kit lens)	BM18	05	Biaya Operasional	Unit	7500000	11000000
99	Proyektor LCD (3000 Lumens, XGA)	BM19	05	Biaya Operasional	Unit	5500000	9000000
100	Mesin Fotokopi (Medium speed, A3, DADF)	BM20	05	Biaya Operasional	Unit	45000000	75000000
101	"Laptop (Core i5, RAM 8GB, SSD 256GB, 14"")"	BM1	06	Biaya Operasional	Unit	9500000	17000000
102	"PC All-in-One (Core i5, RAM 8GB, 21.5"")"	BM2	06	Biaya Operasional	Unit	10000000	18000000
103	Printer Inkjet All-in-One (Print, Scan, Copy)	BM3	06	Biaya Operasional	Unit	3000000	5000000
104	Meja Kerja (Partikel Board, 120x60 cm)	BM4	06	Biaya Operasional	Unit	1000000	1900000
105	Kursi Kerja (Hidrolik, Jaring)	BM5	06	Biaya Operasional	Unit	800000	1600000
106	Lemari Arsip (Besi, 2 Pintu)	BM6	06	Biaya Operasional	Unit	2200000	3600000
107	Mobil Penumpang (MPV 1300cc, ex: Avanza 1.3 E)	BM7	06	Biaya Operasional	Unit	260000000	280000000
108	Sepeda Motor (Matic 125cc, ex: Vario 125)	BM8	06	Biaya Operasional	Unit	25000000	27000000
109	Genset Portable (10 KVA, Diesel, Silent)	BM9	06	Biaya Operasional	Unit	42000000	61000000
110	AC Split (1 PK, Standard)	BM10	06	Biaya Operasional	Unit	4200000	6000000
111	Semen Portland (PCC, 50 kg)	BM11	06	Bahan Baku	Sak	80000	100000
112	Aspal Curah (Aspal Goreng)	BM12	06	Bahan Baku	Kg	40000	48000
113	Pasir Beton	BM13	06	Bahan Baku	m3	450000	550000
114	Kaca Polos (Tebal 5 mm)	BM14	06	Bahan Baku	m2	140000	175000
115	Baja Ringan (Profil C, 0.75mm)	BM15	06	Bahan Baku	Batang (6m)	120000	160000
116	Cat Tembok Eksterior (Weather-resistant, 20L)	BM16	06	Bahan Baku	Pail	2000000	3200000
117	Pipa PVC (4 inch, Tipe AW, per 4m)	BM17	06	Bahan Baku	Batang	170000	250000
118	Kamera DSLR (Entry-level, 24MP, kit lens)	BM18	06	Biaya Operasional	Unit	8500000	12000000
119	Proyektor LCD (3000 Lumens, XGA)	BM19	06	Biaya Operasional	Unit	6500000	10000000
120	Mesin Fotokopi (Medium speed, A3, DADF)	BM20	06	Biaya Operasional	Unit	50000000	85000000
121	"Laptop (Core i5, RAM 8GB, SSD 256GB, 14"")"	BM1	07	Biaya Operasional	Unit	9500000	17000000
122	"PC All-in-One (Core i5, RAM 8GB, 21.5"")"	BM2	07	Biaya Operasional	Unit	10000000	18000000
123	Printer Inkjet All-in-One (Print, Scan, Copy)	BM3	07	Biaya Operasional	Unit	3000000	5000000
124	Meja Kerja (Partikel Board, 120x60 cm)	BM4	07	Biaya Operasional	Unit	1000000	1900000
125	Kursi Kerja (Hidrolik, Jaring)	BM5	07	Biaya Operasional	Unit	800000	1600000
126	Lemari Arsip (Besi, 2 Pintu)	BM6	07	Biaya Operasional	Unit	2200000	3600000
127	Mobil Penumpang (MPV 1300cc, ex: Avanza 1.3 E)	BM7	07	Biaya Operasional	Unit	260000000	280000000
128	Sepeda Motor (Matic 125cc, ex: Vario 125)	BM8	07	Biaya Operasional	Unit	25000000	27000000
129	Genset Portable (10 KVA, Diesel, Silent)	BM9	07	Biaya Operasional	Unit	42000000	61000000
130	AC Split (1 PK, Standard)	BM10	07	Biaya Operasional	Unit	4200000	6000000
131	Semen Portland (PCC, 50 kg)	BM11	07	Bahan Baku	Sak	80000	100000
132	Aspal Curah (Aspal Goreng)	BM12	07	Bahan Baku	Kg	40000	48000
133	Pasir Beton	BM13	07	Bahan Baku	m3	450000	550000
134	Kaca Polos (Tebal 5 mm)	BM14	07	Bahan Baku	m2	140000	175000
135	Baja Ringan (Profil C, 0.75mm)	BM15	07	Bahan Baku	Batang (6m)	120000	160000
136	Cat Tembok Eksterior (Weather-resistant, 20L)	BM16	07	Bahan Baku	Pail	2000000	3200000
137	Pipa PVC (4 inch, Tipe AW, per 4m)	BM17	07	Bahan Baku	Batang	170000	250000
138	Kamera DSLR (Entry-level, 24MP, kit lens)	BM18	07	Biaya Operasional	Unit	8500000	12000000
139	Proyektor LCD (3000 Lumens, XGA)	BM19	07	Biaya Operasional	Unit	6500000	10000000
140	Mesin Fotokopi (Medium speed, A3, DADF)	BM20	07	Biaya Operasional	Unit	50000000	85000000
141	"Laptop (Core i5, RAM 8GB, SSD 256GB, 14"")"	BM1	08	Biaya Operasional	Unit	9000000	16000000
142	"PC All-in-One (Core i5, RAM 8GB, 21.5"")"	BM2	08	Biaya Operasional	Unit	9500000	17000000
143	Printer Inkjet All-in-One (Print, Scan, Copy)	BM3	08	Biaya Operasional	Unit	2700000	4800000
144	Meja Kerja (Partikel Board, 120x60 cm)	BM4	08	Biaya Operasional	Unit	900000	1700000
145	Kursi Kerja (Hidrolik, Jaring)	BM5	08	Biaya Operasional	Unit	700000	1400000
146	Lemari Arsip (Besi, 2 Pintu)	BM6	08	Biaya Operasional	Unit	2000000	3300000
147	Mobil Penumpang (MPV 1300cc, ex: Avanza 1.3 E)	BM7	08	Biaya Operasional	Unit	250000000	270000000
148	Sepeda Motor (Matic 125cc, ex: Vario 125)	BM8	08	Biaya Operasional	Unit	24000000	26000000
149	Genset Portable (10 KVA, Diesel, Silent)	BM9	08	Biaya Operasional	Unit	40000000	58000000
150	AC Split (1 PK, Standard)	BM10	08	Biaya Operasional	Unit	3800000	5500000
151	Semen Portland (PCC, 50 kg)	BM11	08	Bahan Baku	Sak	68000	85000
152	Aspal Curah (Aspal Goreng)	BM12	08	Bahan Baku	Kg	33000	40000
153	Pasir Beton	BM13	08	Bahan Baku	m3	360000	450000
154	Kaca Polos (Tebal 5 mm)	BM14	08	Bahan Baku	m2	125000	155000
155	Baja Ringan (Profil C, 0.75mm)	BM15	08	Bahan Baku	Batang (6m)	100000	140000
156	Cat Tembok Eksterior (Weather-resistant, 20L)	BM16	08	Bahan Baku	Pail	1800000	3000000
157	Pipa PVC (4 inch, Tipe AW, per 4m)	BM17	08	Bahan Baku	Batang	150000	220000
158	Kamera DSLR (Entry-level, 24MP, kit lens)	BM18	08	Biaya Operasional	Unit	7500000	11000000
159	Proyektor LCD (3000 Lumens, XGA)	BM19	08	Biaya Operasional	Unit	5500000	9000000
160	Mesin Fotokopi (Medium speed, A3, DADF)	BM20	08	Biaya Operasional	Unit	45000000	75000000
161	Beras	BBJ1	01	Bahan Baku	Kg	15000	15000
162	Air Mineral	BBJ2	01	Bahan Baku	Liter	5000	5000
163	Kertas	BBJ3	01	Barang Jadi, Barang dagangan	Rim	47000	52000
164	Kemeja	BBJ4	01	Barang Jadi, Barang dagangan	Buah	115000	115000
165	Celana bahan	BBJ5	01	Barang Jadi, Barang dagangan	Buah	85000	160000
166	Telur	BBJ6	01	Bahan Baku	Kg	23900	25300
167	Mobil Toyota Agya 1.2L G	BBJ7	01	Barang Jadi, Barang dagangan	Unit	180900000	0
168	Motor Honda BeAT CBS ISS - OTR	BBJ8	01	Barang Jadi, Barang dagangan	Unit	20765001	0
169	Daging Ayam	BBJ9	01	Bahan Baku	Kg	35188	34550
170	Sayur Sawi	BBJ10	01	Bahan Baku	Kg	10000	19000
171	Batu Bata Merah	BBJ11	01	Barang setengah jadi, barang dagang	Buah	600	700
172	Semen	BBJ12	01	Barang setengah jadi, barang dagang	Sak	68000	70000
173	Triplek Tebal 3mm	BBJ13	01	Barang setengah jadi, barang dagang	Lembar	50000	60000
174	Listrik Rumah	BBJ14	01	Biaya Operasional	kWh	1352	1699
175	Bahan Bakar Kendaraan Pertamax	BBJ15	01	Barang Jadi, Barang dagangan	Liter	12400	12700
176	Jasa Konsultasi Bisnis	BBJ16	01	Pendapatan Jasa	Jam	300000	550000
177	Jasa Pembersihan Rumah	BBJ17	01	Pendapatan Jasa	Jam	50000	75000
178	Jasa Konsultasi Dokter	BBJ18	01	Pendapatan Jasa	Pertemuan	90000	150000
179	Jasa Kursus Matematika	BBJ19	01	Pendapatan Jasa	Pertemuan	40000	110000
180	Jasa Laundry	BBJ20	01	Pendapatan Jasa	Kg	10000	20000
181	Beras	BBJ1	02	Bahan Baku	Kg	14900	0
182	Air Mineral	BBJ2	02	Bahan Baku	Liter	6000	0
183	Kertas	BBJ3	02	Barang Jadi, Barang dagangan	Rim	47000	52000
184	Kemeja	BBJ4	02	Barang Jadi, Barang dagangan	Buah	115000	0
185	Celana bahan	BBJ5	02	Barang Jadi, Barang dagangan	Buah	85000	165000
186	Telur	BBJ6	02	Bahan Baku	Kg	24600	25600
187	Mobil Toyota Agya 1.2L G	BBJ7	02	Barang Jadi, Barang dagangan	Unit	180900000	0
188	Motor Honda BeAT CBS ISS - OTR	BBJ8	02	Barang Jadi, Barang dagangan	Unit	20765000	0
189	Daging Ayam	BBJ9	02	Bahan Baku	Kg	35350	0
190	Sayur Sawi	BBJ10	02	Bahan Baku	Kg	10000	16000
191	Batu Bata Merah	BBJ11	02	Barang setengah jadi, barang dagang	Buah	600	750
192	Semen	BBJ12	02	Barang setengah jadi, barang dagang	Sak	68000	70000
193	Triplek Tebal 3mm	BBJ13	02	Barang setengah jadi, barang dagang	Lembar	50000	60000
194	Listrik Rumah	BBJ14	02	Biaya Operasional	kWh	1352	1699
195	Bahan Bakar Kendaraan Pertamax	BBJ15	02	Barang Jadi, Barang dagangan	Liter	12100	0
196	Jasa Konsultasi Bisnis	BBJ16	02	Pendapatan Jasa	Jam	300000	500000
197	Jasa Pembersihan Rumah	BBJ17	02	Pendapatan Jasa	Jam	60000	80000
198	Jasa Konsultasi Dokter	BBJ18	02	Pendapatan Jasa	Pertemuan	90000	150000
199	Jasa Kursus Matematika	BBJ19	02	Pendapatan Jasa	Pertemuan	40000	110000
200	Jasa Laundry	BBJ20	02	Pendapatan Jasa	Kg	10000	20000
201	Beras	BBJ1	03	Bahan Baku	Kg	14900	0
202	Air Mineral	BBJ2	03	Bahan Baku	Liter	5000	0
203	Kertas	BBJ3	03	Barang Jadi, Barang dagangan	Rim	49000	55000
204	Kemeja	BBJ4	03	Barang Jadi, Barang dagangan	Buah	107000	0
205	Celana bahan	BBJ5	03	Barang Jadi, Barang dagangan	Buah	80000	155000
206	Telur	BBJ6	03	Bahan Baku	Kg	24000	25300
207	Mobil Toyota Agya 1.2L G	BBJ7	03	Barang Jadi, Barang dagangan	Unit	190800000	0
208	Motor Honda BeAT CBS ISS - OTR	BBJ8	03	Barang Jadi, Barang dagangan	Unit	21765000	0
209	Daging Ayam	BBJ9	03	Bahan Baku	Kg	38333	0
210	Sayur Sawi	BBJ10	03	Bahan Baku	Kg	10000	12000
211	Batu Bata Merah	BBJ11	03	Barang setengah jadi, barang dagang	Buah	600	700
212	Semen	BBJ12	03	Barang setengah jadi, barang dagang	Sak	70000	72000
213	Triplek Tebal 3mm	BBJ13	03	Barang setengah jadi, barang dagang	Lembar	55000	65000
214	Listrik Rumah	BBJ14	03	Biaya Operasional	kWh	1352	1699
215	Bahan Bakar Kendaraan Pertamax	BBJ15	03	Barang Jadi, Barang dagangan	Liter	12100	0
216	Jasa Konsultasi Bisnis	BBJ16	03	Pendapatan Jasa	Jam	400000	700000
217	Jasa Pembersihan Rumah	BBJ17	03	Pendapatan Jasa	Jam	60000	80000
218	Jasa Konsultasi Dokter	BBJ18	03	Pendapatan Jasa	Pertemuan	90000	150000
219	Jasa Kursus Matematika	BBJ19	03	Pendapatan Jasa	Pertemuan	40000	110000
220	Jasa Laundry	BBJ20	03	Pendapatan Jasa	Kg	10000	20000
221	Beras	BBJ1	04	Bahan Baku	Kg	14900	0
222	Air Mineral	BBJ2	04	Bahan Baku	Liter	5000	0
223	Kertas	BBJ3	04	Barang Jadi, Barang dagangan	Rim	49000	54000
224	Kemeja	BBJ4	04	Barang Jadi, Barang dagangan	Buah	115000	0
225	Celana bahan	BBJ5	04	Barang Jadi, Barang dagangan	Buah	85000	165000
226	Telur	BBJ6	04	Bahan Baku	Kg	27000	28000
227	Mobil Toyota Agya 1.2L G	BBJ7	04	Barang Jadi, Barang dagangan	Unit	180900000	0
228	Motor Honda BeAT CBS ISS - OTR	BBJ8	04	Barang Jadi, Barang dagangan	Unit	21265001	0
229	Daging Ayam	BBJ9	04	Bahan Baku	Kg	34756	0
230	Sayur Sawi	BBJ10	04	Bahan Baku	Kg	15000	17500
231	Batu Bata Merah	BBJ11	04	Barang setengah jadi, barang dagang	Buah	650	750
232	Semen	BBJ12	04	Barang setengah jadi, barang dagang	Sak	69000	71000
233	Triplek Tebal 3mm	BBJ13	04	Barang setengah jadi, barang dagang	Lembar	55000	65000
234	Listrik Rumah	BBJ14	04	Biaya Operasional	kWh	1352	1699
235	Bahan Bakar Kendaraan Pertamax	BBJ15	04	Barang Jadi, Barang dagangan	Liter	12400	12700
236	Jasa Konsultasi Bisnis	BBJ16	04	Pendapatan Jasa	Jam	350000	600000
237	Jasa Pembersihan Rumah	BBJ17	04	Pendapatan Jasa	Jam	55000	75000
238	Jasa Konsultasi Dokter	BBJ18	04	Pendapatan Jasa	Pertemuan	90000	150000
239	Jasa Kursus Matematika	BBJ19	04	Pendapatan Jasa	Pertemuan	40000	110000
240	Jasa Laundry	BBJ20	04	Pendapatan Jasa	Kg	10000	20000
241	Beras	BBJ1	05	Bahan Baku	Kg	15400	0
242	Air Mineral	BBJ2	05	Bahan Baku	Liter	5000	0
243	Kertas	BBJ3	05	Barang Jadi, Barang dagangan	Rim	49000	54000
244	Kemeja	BBJ4	05	Barang Jadi, Barang dagangan	Buah	115000	0
245	Celana bahan	BBJ5	05	Barang Jadi, Barang dagangan	Buah	85000	165000
246	Telur	BBJ6	05	Bahan Baku	Kg	27000	28000
247	Mobil Toyota Agya 1.2L G	BBJ7	05	Barang Jadi, Barang dagangan	Unit	180900000	0
248	Motor Honda BeAT CBS ISS - OTR	BBJ8	05	Barang Jadi, Barang dagangan	Unit	21265000	0
249	Daging Ayam	BBJ9	05	Bahan Baku	Kg	34756	0
250	Sayur Sawi	BBJ10	05	Bahan Baku	Kg	15000	17500
251	Batu Bata Merah	BBJ11	05	Barang setengah jadi, barang dagang	Buah	650	750
252	Semen	BBJ12	05	Barang setengah jadi, barang dagang	Sak	69000	71000
253	Triplek Tebal 3mm	BBJ13	05	Barang setengah jadi, barang dagang	Lembar	55000	65000
254	Listrik Rumah	BBJ14	05	Biaya Operasional	kWh	1352	1699
255	Bahan Bakar Kendaraan Pertamax	BBJ15	05	Barang Jadi, Barang dagangan	Liter	12400	12700
256	Jasa Konsultasi Bisnis	BBJ16	05	Pendapatan Jasa	Jam	350000	600000
257	Jasa Pembersihan Rumah	BBJ17	05	Pendapatan Jasa	Jam	55000	75000
258	Jasa Konsultasi Dokter	BBJ18	05	Pendapatan Jasa	Pertemuan	90000	150000
259	Jasa Kursus Matematika	BBJ19	05	Pendapatan Jasa	Pertemuan	40000	110000
260	Jasa Laundry	BBJ20	05	Pendapatan Jasa	Kg	10000	20000
261	Beras	BBJ1	06	Bahan Baku	Kg	15800	0
262	Air Mineral	BBJ2	06	Bahan Baku	Liter	5000	0
263	Kertas	BBJ3	06	Barang Jadi, Barang dagangan	Rim	50000	56000
264	Kemeja	BBJ4	06	Barang Jadi, Barang dagangan	Buah	115000	0
265	Celana bahan	BBJ5	06	Barang Jadi, Barang dagangan	Buah	90000	170000
266	Telur	BBJ6	06	Bahan Baku	Kg	27000	28000
267	Mobil Toyota Agya 1.2L G	BBJ7	06	Barang Jadi, Barang dagangan	Unit	175000000	180000000
268	Motor Honda BeAT CBS ISS - OTR	BBJ8	06	Barang Jadi, Barang dagangan	Unit	21765000	0
269	Daging Ayam	BBJ9	06	Bahan Baku	Kg	34756	0
270	Sayur Sawi	BBJ10	06	Bahan Baku	Kg	10000	16000
271	Batu Bata Merah	BBJ11	06	Barang setengah jadi, barang dagang	Buah	700	800
272	Semen	BBJ12	06	Barang setengah jadi, barang dagang	Sak	75000	80000
273	Triplek Tebal 3mm	BBJ13	06	Barang setengah jadi, barang dagang	Lembar	60000	70000
274	Listrik Rumah	BBJ14	06	Biaya Operasional	kWh	1352	1699
275	Bahan Bakar Kendaraan Pertamax	BBJ15	06	Barang Jadi, Barang dagangan	Liter	12400	0
276	Jasa Konsultasi Bisnis	BBJ16	06	Pendapatan Jasa	Jam	400000	700000
277	Jasa Pembersihan Rumah	BBJ17	06	Pendapatan Jasa	Jam	60000	80000
278	Jasa Konsultasi Dokter	BBJ18	06	Pendapatan Jasa	Pertemuan	90000	150000
279	Jasa Kursus Matematika	BBJ19	06	Pendapatan Jasa	Pertemuan	40000	110000
280	Jasa Laundry	BBJ20	06	Pendapatan Jasa	Kg	10000	20000
281	Beras	BBJ1	07	Bahan Baku	Kg	15800	0
282	Air Mineral	BBJ2	07	Bahan Baku	Liter	5000	0
283	Kertas	BBJ3	07	Barang Jadi, Barang dagangan	Rim	50000	56000
284	Kemeja	BBJ4	07	Barang Jadi, Barang dagangan	Buah	115000	0
285	Celana bahan	BBJ5	07	Barang Jadi, Barang dagangan	Buah	90000	170000
286	Telur	BBJ6	07	Bahan Baku	Kg	27000	28000
287	Mobil Toyota Agya 1.2L G	BBJ7	07	Barang Jadi, Barang dagangan	Unit	175000000	180000000
288	Motor Honda BeAT CBS ISS - OTR	BBJ8	07	Barang Jadi, Barang dagangan	Unit	21765000	0
289	Daging Ayam	BBJ9	07	Bahan Baku	Kg	34756	0
290	Sayur Sawi	BBJ10	07	Bahan Baku	Kg	10000	16000
291	Batu Bata Merah	BBJ11	07	Barang setengah jadi, barang dagang	Buah	700	800
292	Semen	BBJ12	07	Barang setengah jadi, barang dagang	Sak	72000	75000
293	Triplek Tebal 3mm	BBJ13	07	Barang setengah jadi, barang dagang	Lembar	60000	70000
294	Listrik Rumah	BBJ14	07	Biaya Operasional	kWh	1352	1699
295	Bahan Bakar Kendaraan Pertamax	BBJ15	07	Barang Jadi, Barang dagangan	Liter	12400	0
296	Jasa Konsultasi Bisnis	BBJ16	07	Pendapatan Jasa	Jam	400000	700000
297	Jasa Pembersihan Rumah	BBJ17	07	Pendapatan Jasa	Jam	60000	80000
298	Jasa Konsultasi Dokter	BBJ18	07	Pendapatan Jasa	Pertemuan	90000	150000
299	Jasa Kursus Matematika	BBJ19	07	Pendapatan Jasa	Pertemuan	40000	110000
300	Jasa Laundry	BBJ20	07	Pendapatan Jasa	Kg	10000	20000
301	Beras	BBJ1	08	Bahan Baku	Kg	14900	0
302	Air Mineral	BBJ2	08	Bahan Baku	Liter	5000	0
303	Kertas	BBJ3	08	Barang Jadi, Barang dagangan	Rim	49000	55000
304	Kemeja	BBJ4	08	Barang Jadi, Barang dagangan	Buah	107000	0
305	Celana bahan	BBJ5	08	Barang Jadi, Barang dagangan	Buah	80000	155000
306	Telur	BBJ6	08	Bahan Baku	Kg	24000	25300
307	Mobil Toyota Agya 1.2L G	BBJ7	08	Barang Jadi, Barang dagangan	Unit	190800000	0
308	Motor Honda BeAT CBS ISS - OTR	BBJ8	08	Barang Jadi, Barang dagangan	Unit	21765000	0
309	Daging Ayam	BBJ9	08	Bahan Baku	Kg	38333	0
310	Sayur Sawi	BBJ10	08	Bahan Baku	Kg	10000	12000
311	Batu Bata Merah	BBJ11	08	Barang setengah jadi, barang dagang	Buah	600	700
312	Semen	BBJ12	08	Barang setengah jadi, barang dagang	Sak	70000	72000
313	Triplek Tebal 3mm	BBJ13	08	Barang setengah jadi, barang dagang	Lembar	55000	65000
314	Listrik Rumah	BBJ14	08	Biaya Operasional	kWh	1352	1699
315	Bahan Bakar Kendaraan Pertamax	BBJ15	08	Barang Jadi, Barang dagangan	Liter	12100	0
316	Jasa Konsultasi Bisnis	BBJ16	08	Pendapatan Jasa	Jam	400000	700000
317	Jasa Pembersihan Rumah	BBJ17	08	Pendapatan Jasa	Jam	60000	80000
318	Jasa Konsultasi Dokter	BBJ18	08	Pendapatan Jasa	Pertemuan	90000	150000
319	Jasa Kursus Matematika	BBJ19	08	Pendapatan Jasa	Pertemuan	40000	110000
320	Jasa Laundry	BBJ20	08	Pendapatan Jasa	Kg	10000	20000
321	Penyediaan Air Bersih	BT1	01	Biaya Operasional/Barang Dagang	Liter	5000	7000
322	Tenda Penampungan Korban 4x6m	BT2	01	Biaya Operasional/Barang Dagang	Buah	1500000	2500000
323	P3K darurat	BT3	01	Barang Dagangan	per set	200000	500000
324	Ambulans	BT4	01	Biaya Operasional	per pengantaran	400000	900000
325	Sewa ruang meeting	BT5	01	Biaya Operasional	per jam	100000	250000
326	Genset 1000 kVA	BT6	01	Biaya Operasional/Barang dagang	per hari	37000000	50000000
327	Modem darurat	BT7	01	Biaya Operasional/Barang dagang	per GB	10000	25000
328	Sewa Mobil Kegiatan Insidentil Roda 4	BT8	01	Biaya Operasional	Hari	1000000	0
329	Jasa IGD	BT9	01	Pendapatan Jasa	per pelayanan	150000	500000
330	Vaksin	BT10	01	Barang Dagangan	per buah	50000	200000
331	Tabung oksigen	BT11	01	Barang Dagangan	per set	150000	300000
332	Bangsal RS	BT12	01	Biaya Operasional	per kamar per hari	150000	500000
333	Makanan kaleng	BT13	01	Barang Jadi/barang dagangan	per buah	15000	30000
334	Kapal karet	BT14	01	Biaya Operasional	per pelayanan	1000000	2000000
335	Sewa kursi roda	BT15	01	Biaya Operasional	per buah per hari	50000	150000
336	Filter air portable	BT16	01	Barang Jadi/barang dagangan	per buah per hari	50000	150000
337	APD tenaga medis	BT17	01	Barang Dagangan	per set	200000	500000
338	Sewa HT	BT18	01	Biaya Operasional	per hari	100000	300000
339	Toilet portabel	BT19	01	Barang Dagangan	per buah per hari	150000	300000
340	Sewa tandu	BT20	01	Biaya Operasional	per buah	50000	150000
341	Penyediaan Air Bersih	BT1	02	Biaya Operasional/Barang Dagang	Liter	4000	7000
342	Tenda Penampungan Korban 4x6m	BT2	02	Biaya Operasional/Barang Dagang	Buah	1500000	2500000
343	P3K darurat	BT3	02	Barang Dagangan	per set	200000	500000
344	Ambulans	BT4	02	Biaya Operasional	per pengantaran	300000	800000
345	Sewa ruang meeting	BT5	02	Biaya Operasional	per jam	150000	400000
346	Genset 1000 kVA	BT6	02	Biaya Operasional/Barang dagang	per hari	37000000	50000000
347	Modem darurat	BT7	02	Biaya Operasional/Barang dagang	per GB	10000	25000
348	Sewa Mobil Kegiatan Insidentil Roda 4	BT8	02	Biaya Operasional	Hari	1100000	0
349	Jasa IGD	BT9	02	Pendapatan Jasa	per pelayanan	150000	500000
350	Vaksin	BT10	02	Barang Dagangan	per buah	50000	200000
351	Tabung oksigen	BT11	02	Barang Dagangan	per set	150000	300000
352	Bangsal RS	BT12	02	Biaya Operasional	per kamar per hari	150000	500000
353	Makanan kaleng	BT13	02	Barang Jadi/barang dagangan	per buah	15000	30000
354	Kapal karet	BT14	02	Biaya Operasional	per pelayanan	1000000	2000000
355	Sewa kursi roda	BT15	02	Biaya Operasional	per buah per hari	50000	150000
356	Filter air portable	BT16	02	Barang Jadi/barang dagangan	per buah per hari	50000	150000
357	APD tenaga medis	BT17	02	Barang Dagangan	per set	200000	500000
358	Sewa HT	BT18	02	Biaya Operasional	per hari	100000	300000
359	Toilet portabel	BT19	02	Barang Dagangan	per buah per hari	150000	300000
360	Sewa tandu	BT20	02	Biaya Operasional	per buah	50000	150000
361	Penyediaan Air Bersih	BT1	03	Biaya Operasional/Barang Dagang	Liter	6000	8000
362	Tenda Penampungan Korban 4x6m	BT2	03	Biaya Operasional/Barang Dagang	Buah	2000000	3000000
363	P3K darurat	BT3	03	Barang Dagangan	per set	200000	500000
364	Ambulans	BT4	03	Biaya Operasional	per pengantaran	500000	1000000
365	Sewa ruang meeting	BT5	03	Biaya Operasional	per jam	150000	300000
366	Genset 1000 kVA	BT6	03	Biaya Operasional/Barang dagang	per hari	40000000	55000000
367	Modem darurat	BT7	03	Biaya Operasional/Barang dagang	per GB	10000	25000
368	Sewa Mobil Kegiatan Insidentil Roda 4	BT8	03	Biaya Operasional	Hari	1250000	0
369	Jasa IGD	BT9	03	Pendapatan Jasa	per pelayanan	150000	500000
370	Vaksin	BT10	03	Barang Dagangan	per buah	50000	200000
371	Tabung oksigen	BT11	03	Barang Dagangan	per set	150000	300000
372	Bangsal RS	BT12	03	Biaya Operasional	per kamar per hari	150000	500000
373	Makanan kaleng	BT13	03	Barang Jadi/barang dagangan	per buah	15000	30000
374	Kapal karet	BT14	03	Biaya Operasional	per pelayanan	1500000	2500000
375	Sewa kursi roda	BT15	03	Biaya Operasional	per buah per hari	50000	150000
376	Filter air portable	BT16	03	Barang Jadi/barang dagangan	per buah per hari	50000	150000
377	APD tenaga medis	BT17	03	Barang Dagangan	per set	200000	500000
378	Sewa HT	BT18	03	Biaya Operasional	per hari	100000	300000
379	Toilet portabel	BT19	03	Barang Dagangan	per buah per hari	200000	400000
380	Sewa tandu	BT20	03	Biaya Operasional	per buah	50000	150000
381	Penyediaan Air Bersih	BT1	04	Biaya Operasional/Barang Dagang	Liter	7000	9000
382	Tenda Penampungan Korban 4x6m	BT2	04	Biaya Operasional/Barang Dagang	Buah	2000000	3000000
383	P3K darurat	BT3	04	Barang Dagangan	per set	200000	500000
384	Ambulans	BT4	04	Biaya Operasional	per pengantaran	600000	1200000
385	Sewa ruang meeting	BT5	04	Biaya Operasional	per jam	150000	300000
386	Genset 1000 kVA	BT6	04	Biaya Operasional/Barang dagang	per hari	40000000	55000000
387	Modem darurat	BT7	04	Biaya Operasional/Barang dagang	per GB	10000	25000
388	Sewa Mobil Kegiatan Insidentil Roda 4	BT8	04	Biaya Operasional	Hari	920000	0
389	Jasa IGD	BT9	04	Pendapatan Jasa	per pelayanan	150000	500000
390	Vaksin	BT10	04	Barang Dagangan	per buah	50000	200000
391	Tabung oksigen	BT11	04	Barang Dagangan	per set	150000	300000
392	Bangsal RS	BT12	04	Biaya Operasional	per kamar per hari	150000	500000
393	Makanan kaleng	BT13	04	Barang Jadi/barang dagangan	per buah	15000	30000
394	Kapal karet	BT14	04	Biaya Operasional	per pelayanan	1500000	3000000
395	Sewa kursi roda	BT15	04	Biaya Operasional	per buah per hari	50000	150000
396	Filter air portable	BT16	04	Barang Jadi/barang dagangan	per buah per hari	50000	150000
397	APD tenaga medis	BT17	04	Barang Dagangan	per set	200000	500000
398	Sewa HT	BT18	04	Biaya Operasional	per hari	100000	300000
399	Toilet portabel	BT19	04	Barang Dagangan	per buah per hari	200000	400000
400	Sewa tandu	BT20	04	Biaya Operasional	per buah	50000	150000
401	Penyediaan Air Bersih	BT1	05	Biaya Operasional/Barang Dagang	Liter	7000	9000
402	Tenda Penampungan Korban 4x6m	BT2	05	Biaya Operasional/Barang Dagang	Buah	2000000	3000000
403	P3K darurat	BT3	05	Barang Dagangan	per set	200000	500000
404	Ambulans	BT4	05	Biaya Operasional	per pengantaran	600000	1200000
405	Sewa ruang meeting	BT5	05	Biaya Operasional	per jam	150000	300000
406	Genset 1000 kVA	BT6	05	Biaya Operasional/Barang dagang	per hari	40000000	55000000
407	Modem darurat	BT7	05	Biaya Operasional/Barang dagang	per GB	10000	25000
408	Sewa Mobil Kegiatan Insidentil Roda 4	BT8	05	Biaya Operasional	Hari	1100000	0
409	Jasa IGD	BT9	05	Pendapatan Jasa	per pelayanan	150000	500000
410	Vaksin	BT10	05	Barang Dagangan	per buah	50000	200000
411	Tabung oksigen	BT11	05	Barang Dagangan	per set	150000	300000
412	Bangsal RS	BT12	05	Biaya Operasional	per kamar per hari	150000	500000
413	Makanan kaleng	BT13	05	Barang Jadi/barang dagangan	per buah	15000	30000
414	Kapal karet	BT14	05	Biaya Operasional	per pelayanan	1500000	3000000
415	Sewa kursi roda	BT15	05	Biaya Operasional	per buah per hari	50000	150000
416	Filter air portable	BT16	05	Barang Jadi/barang dagangan	per buah per hari	50000	150000
417	APD tenaga medis	BT17	05	Barang Dagangan	per set	200000	500000
418	Sewa HT	BT18	05	Biaya Operasional	per hari	100000	300000
419	Toilet portabel	BT19	05	Barang Dagangan	per buah per hari	200000	400000
420	Sewa tandu	BT20	05	Biaya Operasional	per buah	50000	150000
421	Penyediaan Air Bersih	BT1	06	Biaya Operasional/Barang Dagang	Liter	8000	11000
422	Tenda Penampungan Korban 4x6m	BT2	06	Biaya Operasional/Barang Dagang	Buah	2500000	3500000
423	P3K darurat	BT3	06	Barang Dagangan	per set	200000	500000
424	Ambulans	BT4	06	Biaya Operasional	per pengantaran	800000	1500000
425	Sewa ruang meeting	BT5	06	Biaya Operasional	per jam	200000	350000
426	Genset 1000 kVA	BT6	06	Biaya Operasional/Barang dagang	per hari	45000000	55000000
427	Modem darurat	BT7	06	Biaya Operasional/Barang dagang	per GB	10000	25000
428	Sewa Mobil Kegiatan Insidentil Roda 4	BT8	06	Biaya Operasional	Hari	1300000	0
429	Jasa IGD	BT9	06	Pendapatan Jasa	per pelayanan	150000	500000
430	Vaksin	BT10	06	Barang Dagangan	per buah	50000	200000
431	Tabung oksigen	BT11	06	Barang Dagangan	per set	150000	300000
432	Bangsal RS	BT12	06	Biaya Operasional	per kamar per hari	150000	500000
433	Makanan kaleng	BT13	06	Barang Jadi/barang dagangan	per buah	15000	30000
434	Kapal karet	BT14	06	Biaya Operasional	per pelayanan	2000000	3000000
435	Sewa kursi roda	BT15	06	Biaya Operasional	per buah per hari	50000	150000
436	Filter air portable	BT16	06	Barang Jadi/barang dagangan	per buah per hari	50000	150000
437	APD tenaga medis	BT17	06	Barang Dagangan	per set	200000	500000
438	Sewa HT	BT18	06	Biaya Operasional	per hari	100000	300000
439	Toilet portabel	BT19	06	Barang Dagangan	per buah per hari	300000	500000
440	Sewa tandu	BT20	06	Biaya Operasional	per buah	50000	150000
441	Penyediaan Air Bersih	BT1	07	Biaya Operasional/Barang Dagang	Liter	8000	11000
442	Tenda Penampungan Korban 4x6m	BT2	07	Biaya Operasional/Barang Dagang	Buah	2500000	3500000
443	P3K darurat	BT3	07	Barang Dagangan	per set	200000	500000
444	Ambulans	BT4	07	Biaya Operasional	per pengantaran	700000	1300000
445	Sewa ruang meeting	BT5	07	Biaya Operasional	per jam	200000	300000
446	Genset 1000 kVA	BT6	07	Biaya Operasional/Barang dagang	per hari	42000000	55000000
447	Modem darurat	BT7	07	Biaya Operasional/Barang dagang	per GB	10000	25000
448	Sewa Mobil Kegiatan Insidentil Roda 4	BT8	07	Biaya Operasional	Hari	1100000	0
449	Jasa IGD	BT9	07	Pendapatan Jasa	per pelayanan	150000	500000
450	Vaksin	BT10	07	Barang Dagangan	per buah	50000	200000
451	Tabung oksigen	BT11	07	Barang Dagangan	per set	150000	300000
452	Bangsal RS	BT12	07	Biaya Operasional	per kamar per hari	150000	500000
453	Makanan kaleng	BT13	07	Barang Jadi/barang dagangan	per buah	15000	30000
454	Kapal karet	BT14	07	Biaya Operasional	per pelayanan	2000000	3000000
455	Sewa kursi roda	BT15	07	Biaya Operasional	per buah per hari	50000	150000
456	Filter air portable	BT16	07	Barang Jadi/barang dagangan	per buah per hari	50000	150000
457	APD tenaga medis	BT17	07	Barang Dagangan	per set	200000	500000
458	Sewa HT	BT18	07	Biaya Operasional	per hari	100000	300000
459	Toilet portabel	BT19	07	Barang Dagangan	per buah per hari	250000	500000
460	Sewa tandu	BT20	07	Biaya Operasional	per buah	50000	150000
461	Penyediaan Air Bersih	BT1	08	Biaya Operasional/Barang Dagang	Liter	6000	8000
462	Tenda Penampungan Korban 4x6m	BT2	08	Biaya Operasional/Barang Dagang	Buah	2000000	3000000
463	P3K darurat	BT3	08	Barang Dagangan	per set	200000	500000
464	Ambulans	BT4	08	Biaya Operasional	per pengantaran	600000	1200000
465	Sewa ruang meeting	BT5	08	Biaya Operasional	per jam	150000	300000
466	Genset 1000 kVA	BT6	08	Biaya Operasional/Barang dagang	per hari	40000000	55000000
467	Modem darurat	BT7	08	Biaya Operasional/Barang dagang	per GB	10000	25000
468	Sewa Mobil Kegiatan Insidentil Roda 4	BT8	08	Biaya Operasional	Hari	1000000	0
469	Jasa IGD	BT9	08	Pendapatan Jasa	per pelayanan	150000	500000
470	Vaksin	BT10	08	Barang Dagangan	per buah	50000	200000
471	Tabung oksigen	BT11	08	Barang Dagangan	per set	150000	300000
472	Bangsal RS	BT12	08	Biaya Operasional	per kamar per hari	150000	500000
473	Makanan kaleng	BT13	08	Barang Jadi/barang dagangan	per buah	15000	30000
474	Kapal karet	BT14	08	Biaya Operasional	per pelayanan	1500000	2500000
475	Sewa kursi roda	BT15	08	Biaya Operasional	per buah per hari	50000	150000
476	Filter air portable	BT16	08	Barang Jadi/barang dagangan	per buah per hari	50000	150000
477	APD tenaga medis	BT17	08	Barang Dagangan	per set	200000	500000
478	Sewa HT	BT18	08	Biaya Operasional	per hari	100000	300000
479	Toilet portabel	BT19	08	Barang Dagangan	per buah per hari	200000	400000
480	Sewa tandu	BT20	08	Biaya Operasional	per buah	50000	150000
481	Alat Pemadam Kebakaran	BL1	01	Barang Jadi/Barang dagangan	per set	299000	983000
482	Jasa Pemasangan Iklan	BL2	01	Pendapatan Jasa	per pemasangan	500000	5000000
483	Printer	BL3	01	Barang Jadi/Barang dagangan	per buah	5511000	0
484	Disinfektan	BL4	01	Barang Jadi/Barang dagangan	per liter	50000	100000
485	Air Conditioner	BL5	01	Barang Jadi/Barang dagangan	per buah	2799000	4089000
486	Laptop	BL6	01	Barang Jadi/Barang dagangan	per buah	3700000	7000000
487	Pensil	BL7	01	Barang Jadi/Barang dagangan	per buah	1500	5000
488	Tempat Sampah	BL8	01	Barang Jadi/Barang dagangan	per buah	30000	150000
489	Mesin Cuci	BL9	01	Barang Jadi/Barang dagangan	per buah	3500000	5500000
490	Toa	BL10	01	Barang Jadi/Barang dagangan	per set	1200000	3000000
491	Sabun Batang	BL11	01	Barang Jadi/Barang dagangan	per buah	10000	25000
492	Vitamin	BL12	01	Barang Jadi/Barang dagangan	per botol	50000	150000
493	Sewa Proyektor	BL13	01	Biaya Operasional	per buah	150000	250000
494	Jasa Event Organizer	BL14	01	Pendapatan Jasa	per pelayanan	5000000	50000000
495	Helm	BL15	01	Barang Jadi/Barang dagangan	per buah	100000	250000
496	Kamera (DSLR entry)	BL16	01	Barang Jadi/Barang dagangan	per buah	4000000	8000000
497	Thermometer Digital	BL17	01	Barang Jadi/Barang dagangan	per buah	30000	150000
498	Balon	BL18	01	Barang Jadi/Barang dagangan	per buah	5000	20000
499	Rice Cooker	BL19	01	Barang Jadi/Barang dagangan	per buah	300000	800000
500	Pigura	BL20	01	Barang Jadi/Barang dagangan	per buah	50000	200000
501	Alat Pemadam Kebakaran	BL1	02	Barang Jadi/Barang dagangan	per set	299000	983000
502	Jasa Pemasangan Iklan	BL2	02	Pendapatan Jasa	per pemasangan	500000	5000000
503	Printer	BL3	02	Barang Jadi/Barang dagangan	per buah	5511000	0
504	Disinfektan	BL4	02	Barang Jadi/Barang dagangan	per liter	50000	100000
505	Air Conditioner	BL5	02	Barang Jadi/Barang dagangan	per buah	2799000	4089000
506	Laptop	BL6	02	Barang Jadi/Barang dagangan	per buah	3700000	7000000
507	Pensil	BL7	02	Barang Jadi/Barang dagangan	per buah	1500	5000
508	Tempat Sampah	BL8	02	Barang Jadi/Barang dagangan	per buah	30000	150000
509	Mesin Cuci	BL9	02	Barang Jadi/Barang dagangan	per buah	3500000	5500000
510	Toa	BL10	02	Barang Jadi/Barang dagangan	per set	1200000	3000000
511	Sabun Batang	BL11	02	Barang Jadi/Barang dagangan	per buah	10000	25000
512	Vitamin	BL12	02	Barang Jadi/Barang dagangan	per botol	50000	150000
513	Sewa Proyektor	BL13	02	Biaya Operasional	per buah	150000	250000
514	Jasa Event Organizer	BL14	02	Pendapatan Jasa	per pelayanan	5000000	50000000
515	Helm	BL15	02	Barang Jadi/Barang dagangan	per buah	100000	250000
516	Kamera (DSLR entry)	BL16	02	Barang Jadi/Barang dagangan	per buah	4000000	8000000
517	Thermometer Digital	BL17	02	Barang Jadi/Barang dagangan	per buah	30000	150000
518	Balon	BL18	02	Barang Jadi/Barang dagangan	per buah	5000	20000
519	Rice Cooker	BL19	02	Barang Jadi/Barang dagangan	per buah	300000	800000
520	Pigura	BL20	02	Barang Jadi/Barang dagangan	per buah	50000	200000
521	Alat Pemadam Kebakaran	BL1	03	Barang Jadi/Barang dagangan	per set	299000	983000
522	Jasa Pemasangan Iklan	BL2	03	Pendapatan Jasa	per pemasangan	600000	5500000
523	Printer	BL3	03	Barang Jadi/Barang dagangan	per buah	5511000	0
524	Disinfektan	BL4	03	Barang Jadi/Barang dagangan	per liter	50000	100000
525	Air Conditioner	BL5	03	Barang Jadi/Barang dagangan	per buah	2799000	4089000
526	Laptop	BL6	03	Barang Jadi/Barang dagangan	per buah	3700000	7000000
527	Pensil	BL7	03	Barang Jadi/Barang dagangan	per buah	1500	5000
528	Tempat Sampah	BL8	03	Barang Jadi/Barang dagangan	per buah	40000	160000
529	Mesin Cuci	BL9	03	Barang Jadi/Barang dagangan	per buah	3700000	5800000
530	Toa	BL10	03	Barang Jadi/Barang dagangan	per set	1300000	3200000
531	Sabun Batang	BL11	03	Barang Jadi/Barang dagangan	per buah	10000	25000
532	Vitamin	BL12	03	Barang Jadi/Barang dagangan	per botol	50000	150000
533	Sewa Proyektor	BL13	03	Biaya Operasional	per buah	150000	250000
534	Jasa Event Organizer	BL14	03	Pendapatan Jasa	per pelayanan	6000000	55000000
535	Helm	BL15	03	Barang Jadi/Barang dagangan	per buah	120000	300000
536	Kamera (DSLR entry)	BL16	03	Barang Jadi/Barang dagangan	per buah	4200000	8500000
537	Thermometer Digital	BL17	03	Barang Jadi/Barang dagangan	per buah	30000	150000
538	Balon	BL18	03	Barang Jadi/Barang dagangan	per buah	5000	20000
539	Rice Cooker	BL19	03	Barang Jadi/Barang dagangan	per buah	350000	850000
540	Pigura	BL20	03	Barang Jadi/Barang dagangan	per buah	60000	250000
541	Alat Pemadam Kebakaran	BL1	04	Barang Jadi/Barang dagangan	per set	299000	983000
542	Jasa Pemasangan Iklan	BL2	04	Pendapatan Jasa	per pemasangan	600000	5500000
543	Printer	BL3	04	Barang Jadi/Barang dagangan	per buah	5511000	0
544	Disinfektan	BL4	04	Barang Jadi/Barang dagangan	per liter	50000	100000
545	Air Conditioner	BL5	04	Barang Jadi/Barang dagangan	per buah	2799000	4089000
546	Laptop	BL6	04	Barang Jadi/Barang dagangan	per buah	3700000	7000000
547	Pensil	BL7	04	Barang Jadi/Barang dagangan	per buah	1500	5000
548	Tempat Sampah	BL8	04	Barang Jadi/Barang dagangan	per buah	40000	160000
549	Mesin Cuci	BL9	04	Barang Jadi/Barang dagangan	per buah	3700000	5800000
550	Toa	BL10	04	Barang Jadi/Barang dagangan	per set	1300000	3200000
551	Sabun Batang	BL11	04	Barang Jadi/Barang dagangan	per buah	10000	25000
552	Vitamin	BL12	04	Barang Jadi/Barang dagangan	per botol	50000	150000
553	Sewa Proyektor	BL13	04	Biaya Operasional	per buah	150000	250000
554	Jasa Event Organizer	BL14	04	Pendapatan Jasa	per pelayanan	6000000	55000000
555	Helm	BL15	04	Barang Jadi/Barang dagangan	per buah	120000	300000
556	Kamera (DSLR entry)	BL16	04	Barang Jadi/Barang dagangan	per buah	4200000	8500000
557	Thermometer Digital	BL17	04	Barang Jadi/Barang dagangan	per buah	30000	150000
558	Balon	BL18	04	Barang Jadi/Barang dagangan	per buah	5000	20000
559	Rice Cooker	BL19	04	Barang Jadi/Barang dagangan	per buah	350000	850000
560	Pigura	BL20	04	Barang Jadi/Barang dagangan	per buah	60000	250000
561	Alat Pemadam Kebakaran	BL1	05	Barang Jadi/Barang dagangan	per set	299000	983000
562	Jasa Pemasangan Iklan	BL2	05	Pendapatan Jasa	per pemasangan	600000	5500000
563	Printer	BL3	05	Barang Jadi/Barang dagangan	per buah	5511000	0
564	Disinfektan	BL4	05	Barang Jadi/Barang dagangan	per liter	50000	100000
565	Air Conditioner	BL5	05	Barang Jadi/Barang dagangan	per buah	2799000	4089000
566	Laptop	BL6	05	Barang Jadi/Barang dagangan	per buah	3700000	7000000
567	Pensil	BL7	05	Barang Jadi/Barang dagangan	per buah	1500	5000
568	Tempat Sampah	BL8	05	Barang Jadi/Barang dagangan	per buah	40000	160000
569	Mesin Cuci	BL9	05	Barang Jadi/Barang dagangan	per buah	3700000	5800000
570	Toa	BL10	05	Barang Jadi/Barang dagangan	per set	1300000	3200000
571	Sabun Batang	BL11	05	Barang Jadi/Barang dagangan	per buah	10000	25000
572	Vitamin	BL12	05	Barang Jadi/Barang dagangan	per botol	50000	150000
573	Sewa Proyektor	BL13	05	Biaya Operasional	per buah	150000	250000
574	Jasa Event Organizer	BL14	05	Pendapatan Jasa	per pelayanan	6000000	55000000
575	Helm	BL15	05	Barang Jadi/Barang dagangan	per buah	120000	300000
576	Kamera (DSLR entry)	BL16	05	Barang Jadi/Barang dagangan	per buah	4200000	8500000
577	Thermometer Digital	BL17	05	Barang Jadi/Barang dagangan	per buah	30000	150000
578	Balon	BL18	05	Barang Jadi/Barang dagangan	per buah	5000	20000
579	Rice Cooker	BL19	05	Barang Jadi/Barang dagangan	per buah	350000	850000
580	Pigura	BL20	05	Barang Jadi/Barang dagangan	per buah	60000	250000
581	Alat Pemadam Kebakaran	BL1	06	Barang Jadi/Barang dagangan	per set	299000	983000
582	Jasa Pemasangan Iklan	BL2	06	Pendapatan Jasa	per pemasangan	700000	6000000
583	Printer	BL3	06	Barang Jadi/Barang dagangan	per buah	5511000	0
584	Disinfektan	BL4	06	Barang Jadi/Barang dagangan	per liter	50000	100000
585	Air Conditioner	BL5	06	Barang Jadi/Barang dagangan	per buah	2799000	4089000
586	Laptop	BL6	06	Barang Jadi/Barang dagangan	per buah	3700000	7000000
587	Pensil	BL7	06	Barang Jadi/Barang dagangan	per buah	2000	6000
588	Tempat Sampah	BL8	06	Barang Jadi/Barang dagangan	per buah	50000	180000
589	Mesin Cuci	BL9	06	Barang Jadi/Barang dagangan	per buah	4000000	6000000
590	Toa	BL10	06	Barang Jadi/Barang dagangan	per set	1500000	3500000
591	Sabun Batang	BL11	06	Barang Jadi/Barang dagangan	per buah	20000	30000
592	Vitamin	BL12	06	Barang Jadi/Barang dagangan	per botol	60000	180000
593	Sewa Proyektor	BL13	06	Biaya Operasional	per buah	180000	300000
594	Jasa Event Organizer	BL14	06	Pendapatan Jasa	per pelayanan	7000000	60000000
595	Helm	BL15	06	Barang Jadi/Barang dagangan	per buah	150000	350000
596	Kamera (DSLR entry)	BL16	06	Barang Jadi/Barang dagangan	per buah	5000000	9000000
597	Thermometer Digital	BL17	06	Barang Jadi/Barang dagangan	per buah	40000	180000
598	Balon	BL18	06	Barang Jadi/Barang dagangan	per buah	6000	25000
599	Rice Cooker	BL19	06	Barang Jadi/Barang dagangan	per buah	400000	900000
600	Pigura	BL20	06	Barang Jadi/Barang dagangan	per buah	70000	300000
601	Alat Pemadam Kebakaran	BL1	07	Barang Jadi/Barang dagangan	per set	299000	983000
602	Jasa Pemasangan Iklan	BL2	07	Pendapatan Jasa	per pemasangan	700000	6000000
603	Printer	BL3	07	Barang Jadi/Barang dagangan	per buah	5511000	0
604	Disinfektan	BL4	07	Barang Jadi/Barang dagangan	per liter	50000	100000
605	Air Conditioner	BL5	07	Barang Jadi/Barang dagangan	per buah	2799000	4089000
606	Laptop	BL6	07	Barang Jadi/Barang dagangan	per buah	3700000	7000000
607	Pensil	BL7	07	Barang Jadi/Barang dagangan	per buah	2000	6000
608	Tempat Sampah	BL8	07	Barang Jadi/Barang dagangan	per buah	50000	180000
609	Mesin Cuci	BL9	07	Barang Jadi/Barang dagangan	per buah	4000000	6000000
610	Toa	BL10	07	Barang Jadi/Barang dagangan	per set	1500000	3500000
611	Sabun Batang	BL11	07	Barang Jadi/Barang dagangan	per buah	20000	30000
612	Vitamin	BL12	07	Barang Jadi/Barang dagangan	per botol	60000	180000
613	Sewa Proyektor	BL13	07	Biaya Operasional	per buah	180000	300000
614	Jasa Event Organizer	BL14	07	Pendapatan Jasa	per pelayanan	7000000	60000000
615	Helm	BL15	07	Barang Jadi/Barang dagangan	per buah	150000	350000
616	Kamera (DSLR entry)	BL16	07	Barang Jadi/Barang dagangan	per buah	5000000	9000000
617	Thermometer Digital	BL17	07	Barang Jadi/Barang dagangan	per buah	40000	180000
618	Balon	BL18	07	Barang Jadi/Barang dagangan	per buah	6000	25000
619	Rice Cooker	BL19	07	Barang Jadi/Barang dagangan	per buah	400000	900000
620	Pigura	BL20	07	Barang Jadi/Barang dagangan	per buah	70000	300000
621	Alat Pemadam Kebakaran	BL1	08	Barang Jadi/Barang dagangan	per set	299000	983000
622	Jasa Pemasangan Iklan	BL2	08	Pendapatan Jasa	per pemasangan	600000	5500000
623	Printer	BL3	08	Barang Jadi/Barang dagangan	per buah	5511000	0
624	Disinfektan	BL4	08	Barang Jadi/Barang dagangan	per liter	50000	100000
625	Air Conditioner	BL5	08	Barang Jadi/Barang dagangan	per buah	2799000	4089000
626	Laptop	BL6	08	Barang Jadi/Barang dagangan	per buah	3700000	7000000
627	Pensil	BL7	08	Barang Jadi/Barang dagangan	per buah	1500	5000
628	Tempat Sampah	BL8	08	Barang Jadi/Barang dagangan	per buah	40000	160000
629	Mesin Cuci	BL9	08	Barang Jadi/Barang dagangan	per buah	3700000	5800000
630	Toa	BL10	08	Barang Jadi/Barang dagangan	per set	1300000	3200000
631	Sabun Batang	BL11	08	Barang Jadi/Barang dagangan	per buah	10000	25000
632	Vitamin	BL12	08	Barang Jadi/Barang dagangan	per botol	50000	150000
633	Sewa Proyektor	BL13	08	Biaya Operasional	per buah	150000	250000
634	Jasa Event Organizer	BL14	08	Pendapatan Jasa	per pelayanan	6000000	55000000
635	Helm	BL15	08	Barang Jadi/Barang dagangan	per buah	120000	300000
636	Kamera (DSLR entry)	BL16	08	Barang Jadi/Barang dagangan	per buah	4200000	8500000
637	Thermometer Digital	BL17	08	Barang Jadi/Barang dagangan	per buah	30000	150000
638	Balon	BL18	08	Barang Jadi/Barang dagangan	per buah	5000	20000
639	Rice Cooker	BL19	08	Barang Jadi/Barang dagangan	per buah	350000	850000
640	Pigura	BL20	08	Barang Jadi/Barang dagangan	per buah	60000	250000
`;

// Logic to clean and parse messy data
const lines = rawPriceData.trim().split('\n').slice(1);
const parsedData: PriceRecord[] = lines
    .map((line, index) => {
        // Use regex to split by tabs or multiple spaces
        const parts = line.trim().split(/\t|\s{2,}/);
        if (parts.length < 8) {
            console.warn(`Skipping malformed line ${index + 2}:`, line);
            return null;
        }

        try {
            const [
                _no,
                productName,
                productCode,
                regionCode,
                category,
                unit,
                minPriceStr,
                maxPriceStr,
            ] = parts;
            
            const minPrice = parseInt(minPriceStr.replace(/,/g, ''), 10) || 0;
            let maxPrice = parseInt(maxPriceStr.replace(/,/g, ''), 10) || 0;

            if (maxPrice === 0 && minPrice > 0) {
                maxPrice = minPrice;
            }

            if (!productName || !productCode || !regionCode) {
                return null;
            }

            return {
                id: index + 1,
                productName: productName.replace(/"/g, '').trim(),
                productCode: productCode.trim(),
                regionCode: regionCode.trim(),
                regionName: regionMap[regionCode.trim()] || 'Unknown',
                category: category.trim(),
                unit: unit.trim(),
                minPrice: minPrice,
                maxPrice: maxPrice,
            };
        } catch (e) {
            console.error("Failed to parse line:", line, e);
            return null;
        }
    })
    .filter((item): item is PriceRecord => item !== null);

export const priceData = parsedData;