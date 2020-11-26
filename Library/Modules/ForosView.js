import { WRender } from "../WDevCore/WModules/WComponentsTools.js";

class ForosView {
    constructor(props) {
        this.type = "div";
        this.props = props;
        this.children = [];
        this.children.push({
            type: 'h2',
            props: { innerText: "Table DINAMIC MULTIOPTIONS........." },
        })
        const response = { "kind": "youtube#searchListResponse", "etag": "dku7HekkYJP4mqfSTjEk1NSBc28", "nextPageToken": "CDIQAA", "regionCode": "NI", "pageInfo": { "totalResults": 311, "resultsPerPage": 50 }, "items": [{ "kind": "youtube#searchResult", "etag": "SuQue1tcoigJxbhtLYCLCLpb2ak", "id": { "kind": "youtube#video", "videoId": "h1EqCKH7Zng" }, "snippet": { "publishedAt": "2020-11-18T22:50:27Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "Educación inclusiva: Experiencias del programa educaciòn inclusiva(U-Inclusiva) - Msc. Oscar Fletes", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/h1EqCKH7Zng/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/h1EqCKH7Zng/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/h1EqCKH7Zng/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-11-18T22:50:27Z" } }, { "kind": "youtube#searchResult", "etag": "PPy7nBh-zVXYpfpC-wW42mXJ9lY", "id": { "kind": "youtube#video", "videoId": "BtTHFZ4GLxw" }, "snippet": { "publishedAt": "2020-07-21T21:43:01Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "EL CORONAVIRUS", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/BtTHFZ4GLxw/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/BtTHFZ4GLxw/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/BtTHFZ4GLxw/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-07-21T21:43:01Z" } }, { "kind": "youtube#searchResult", "etag": "jMiXTFfJeDifxYCmyQQLJp_HiJ0", "id": { "kind": "youtube#video", "videoId": "8scnMeTl4dY" }, "snippet": { "publishedAt": "2020-07-17T22:19:45Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "EXPERIENCIA CON LA DIABETES LIC. FRANCISCO RODRIGUEZ", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/8scnMeTl4dY/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/8scnMeTl4dY/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/8scnMeTl4dY/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-07-17T22:19:45Z" } }, { "kind": "youtube#searchResult", "etag": "kwgh5Ujy9FrvtZZhtGKywT9LIwU", "id": { "kind": "youtube#video", "videoId": "25BBqD2q6so" }, "snippet": { "publishedAt": "2020-07-13T14:48:52Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "CONVERSION DE UNIDADES DEL SISTEMA INGLES AL SISTEMA INTERNACIONAL", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/25BBqD2q6so/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/25BBqD2q6so/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/25BBqD2q6so/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-07-13T14:48:52Z" } }, { "kind": "youtube#searchResult", "etag": "CCx2r4LZEMeV9Vq1FYjDApbdpcU", "id": { "kind": "youtube#video", "videoId": "1qOSx8qRw0Q" }, "snippet": { "publishedAt": "2020-07-13T14:43:32Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "PRUEBA DE HIPOTESIS", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/1qOSx8qRw0Q/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/1qOSx8qRw0Q/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/1qOSx8qRw0Q/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-07-13T14:43:32Z" } }, { "kind": "youtube#searchResult", "etag": "erWevKxTU_W6Bw64BrcxN02A2Cc", "id": { "kind": "youtube#video", "videoId": "JtzAUFKHoRU" }, "snippet": { "publishedAt": "2020-07-10T17:41:56Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "ENTREVISTA - MSC. ERICK CRUZ", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/JtzAUFKHoRU/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/JtzAUFKHoRU/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/JtzAUFKHoRU/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-07-10T17:41:56Z" } }, { "kind": "youtube#searchResult", "etag": "HYkAQZazqWPMdHlZ0rNitQFNMgg", "id": { "kind": "youtube#video", "videoId": "VNF6YSHvyOs" }, "snippet": { "publishedAt": "2020-07-10T17:12:22Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "LA DIABETES", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/VNF6YSHvyOs/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/VNF6YSHvyOs/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/VNF6YSHvyOs/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-07-10T17:12:22Z" } }, { "kind": "youtube#searchResult", "etag": "cwuPM91gAy44N7AfxHqYkbRW3MQ", "id": { "kind": "youtube#video", "videoId": "cBjH8_pNDlk" }, "snippet": { "publishedAt": "2020-07-09T19:23:57Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "ENTREVISTA - JOSÉ IGNACIO SÁNCHEZ", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/cBjH8_pNDlk/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/cBjH8_pNDlk/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/cBjH8_pNDlk/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-07-09T19:23:57Z" } }, { "kind": "youtube#searchResult", "etag": "TiRRCyXd4MWM37tLJa7fGVFrDM8", "id": { "kind": "youtube#video", "videoId": "IL4Gfs_Srt0" }, "snippet": { "publishedAt": "2020-07-09T16:11:50Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "MITOS DE LA DIABETES", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/IL4Gfs_Srt0/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/IL4Gfs_Srt0/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/IL4Gfs_Srt0/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-07-09T16:11:50Z" } }, { "kind": "youtube#searchResult", "etag": "OqHT2oB6kC4kgVQ9qKuXPtADeF0", "id": { "kind": "youtube#video", "videoId": "PBbgOTKVTak" }, "snippet": { "publishedAt": "2020-07-09T16:00:38Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "medidas y recomendaciones", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/PBbgOTKVTak/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/PBbgOTKVTak/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/PBbgOTKVTak/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-07-09T16:00:38Z" } }, { "kind": "youtube#searchResult", "etag": "RBxsgYGw2Vhpuq_Nn8DDvTRh018", "id": { "kind": "youtube#video", "videoId": "TlrHaNbX7rg" }, "snippet": { "publishedAt": "2020-07-09T15:58:22Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "MEDIDAS CON EL COVID-19", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/TlrHaNbX7rg/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/TlrHaNbX7rg/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/TlrHaNbX7rg/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-07-09T15:58:22Z" } }, { "kind": "youtube#searchResult", "etag": "GE1ZwVJ4s_1MNCG9E4QdNvks6q4", "id": { "kind": "youtube#video", "videoId": "JBm3OrR1eaU" }, "snippet": { "publishedAt": "2020-07-07T22:05:08Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "SINTOMATOLOGIA - DIABETES", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/JBm3OrR1eaU/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/JBm3OrR1eaU/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/JBm3OrR1eaU/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-07-07T22:05:08Z" } }, { "kind": "youtube#searchResult", "etag": "htjt0NjZPBWhAAA_KlceJ4BWIYY", "id": { "kind": "youtube#video", "videoId": "I0M3_-OP5KA" }, "snippet": { "publishedAt": "2020-07-07T22:01:16Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "DEFINICIÓN - DIABETES", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/I0M3_-OP5KA/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/I0M3_-OP5KA/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/I0M3_-OP5KA/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-07-07T22:01:16Z" } }, { "kind": "youtube#searchResult", "etag": "ex1PCWbniJJNo7HmNgByXu-Ju7c", "id": { "kind": "youtube#video", "videoId": "w0SCoJWQgZ8" }, "snippet": { "publishedAt": "2020-07-07T21:48:57Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "DIABETES - PRESENTACIÓN", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/w0SCoJWQgZ8/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/w0SCoJWQgZ8/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/w0SCoJWQgZ8/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-07-07T21:48:57Z" } }, { "kind": "youtube#searchResult", "etag": "3fpPLI0BYCOBM9e_26IsjMiRlyk", "id": { "kind": "youtube#playlist", "playlistId": "PLHQhsEjIaW6l-wAhLueSlptGk_p3UT2zw" }, "snippet": { "publishedAt": "2020-07-07T21:48:11Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "DIABETES", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/w0SCoJWQgZ8/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/w0SCoJWQgZ8/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/w0SCoJWQgZ8/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-07-07T21:48:11Z" } }, { "kind": "youtube#searchResult", "etag": "h-WAbNS3SadHMFSNzdqFapONBjc", "id": { "kind": "youtube#video", "videoId": "kxCLKUY2UMc" }, "snippet": { "publishedAt": "2020-03-19T22:14:27Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "Primer ejercicio de Simulacro Nacional para salvaguardar la vida 2020", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/kxCLKUY2UMc/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/kxCLKUY2UMc/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/kxCLKUY2UMc/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-03-19T22:14:27Z" } }, { "kind": "youtube#searchResult", "etag": "YFpbxa1DexFc9vv7EVe_OhM2fEI", "id": { "kind": "youtube#video", "videoId": "wni84kBdwck" }, "snippet": { "publishedAt": "2020-02-25T20:38:23Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "Inauguración del Zoocriadero de iguanas verdes y especies nativas - MSc. Ramona Rodríguez", "description": "Inauguración del Zoocriadero de iguanas verdes y especies nativas del departamento de Carazo.", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/wni84kBdwck/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/wni84kBdwck/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/wni84kBdwck/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-02-25T20:38:23Z" } }, { "kind": "youtube#searchResult", "etag": "XzY8OQvMcB0MWQShcUhSVfFtSqA", "id": { "kind": "youtube#video", "videoId": "qfV9nhxohhA" }, "snippet": { "publishedAt": "2020-02-19T17:47:17Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "hv yader guillen 1", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/qfV9nhxohhA/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/qfV9nhxohhA/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/qfV9nhxohhA/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-02-19T17:47:17Z" } }, { "kind": "youtube#searchResult", "etag": "UWBb2QxLn8uqcItmhCEKn8MX3dI", "id": { "kind": "youtube#video", "videoId": "4OSx9wLFO9Q" }, "snippet": { "publishedAt": "2020-02-18T23:52:03Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "Historia de Vida - LESBIA CAROLINA", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/4OSx9wLFO9Q/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/4OSx9wLFO9Q/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/4OSx9wLFO9Q/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-02-18T23:52:03Z" } }, { "kind": "youtube#searchResult", "etag": "NmpkHkfz_riKUqn_1VgKUbt1uo8", "id": { "kind": "youtube#video", "videoId": "AjWGVXwoq-Y" }, "snippet": { "publishedAt": "2020-01-15T23:32:58Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "00043", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/AjWGVXwoq-Y/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/AjWGVXwoq-Y/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/AjWGVXwoq-Y/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2020-01-15T23:32:58Z" } }, { "kind": "youtube#searchResult", "etag": "XTQfhLJjbrcuF40Abqiot53lu_4", "id": { "kind": "youtube#video", "videoId": "IzPzSD8-NLA" }, "snippet": { "publishedAt": "2019-12-16T14:45:40Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "SIMPOSIO", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/IzPzSD8-NLA/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/IzPzSD8-NLA/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/IzPzSD8-NLA/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-12-16T14:45:40Z" } }, { "kind": "youtube#searchResult", "etag": "JLedIzMvnnM-jUbWeZL8A5mYcb0", "id": { "kind": "youtube#video", "videoId": "XPxx1uPwtDs" }, "snippet": { "publishedAt": "2019-12-10T14:08:31Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "ENCITEC", "description": "ENCITEC, Mensaje Natanael.", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/XPxx1uPwtDs/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/XPxx1uPwtDs/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/XPxx1uPwtDs/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-12-10T14:08:31Z" } }, { "kind": "youtube#searchResult", "etag": "MojHZTPrg87iKp-8lls--V3Tkmo", "id": { "kind": "youtube#video", "videoId": "CSWRcJlrQ_0" }, "snippet": { "publishedAt": "2019-12-10T13:49:18Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "ENCITEC", "description": "ENCITEC, mensaje Estudiante computación Rubén.", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/CSWRcJlrQ_0/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/CSWRcJlrQ_0/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/CSWRcJlrQ_0/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-12-10T13:49:18Z" } }, { "kind": "youtube#searchResult", "etag": "uG2nILJJQ2_NMojHZjS5hCgt-5s", "id": { "kind": "youtube#video", "videoId": "0jQCEkmyp3k" }, "snippet": { "publishedAt": "2019-12-10T13:45:15Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "ENCITEC", "description": "ENCITEC, mensaje Estudiante Contabilidad.", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/0jQCEkmyp3k/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/0jQCEkmyp3k/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/0jQCEkmyp3k/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-12-10T13:45:15Z" } }, { "kind": "youtube#searchResult", "etag": "Kb80kShv5Ydm_9UYcMC6c7fI8Pc", "id": { "kind": "youtube#video", "videoId": "aSR1OY0APyc" }, "snippet": { "publishedAt": "2019-12-10T07:37:34Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "ENCITEC", "description": "ENCITEC, mensaje Secretaría académica.", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/aSR1OY0APyc/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/aSR1OY0APyc/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/aSR1OY0APyc/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-12-10T07:37:34Z" } }, { "kind": "youtube#searchResult", "etag": "B063qVkW6HLCapng_iR0ucygQpc", "id": { "kind": "youtube#video", "videoId": "_n_eOYarihU" }, "snippet": { "publishedAt": "2019-12-10T07:23:02Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "ENCITEC", "description": "Mensaje ENCITEC, Adriana Hernandez.", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/_n_eOYarihU/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/_n_eOYarihU/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/_n_eOYarihU/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-12-10T07:23:02Z" } }, { "kind": "youtube#searchResult", "etag": "A2isbZbEgPsxF3Ku625zUqLWK6U", "id": { "kind": "youtube#video", "videoId": "ER6N1RsvHrE" }, "snippet": { "publishedAt": "2019-12-02T17:23:56Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "ENCITEC", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/ER6N1RsvHrE/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/ER6N1RsvHrE/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/ER6N1RsvHrE/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-12-02T17:23:56Z" } }, { "kind": "youtube#searchResult", "etag": "Pq4-GylSxX-Kmd6bBFW0H6ogH8g", "id": { "kind": "youtube#video", "videoId": "fLk4dPG1WyA" }, "snippet": { "publishedAt": "2019-10-30T14:48:33Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "Historia de vida Daniel Aguirre", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/fLk4dPG1WyA/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/fLk4dPG1WyA/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/fLk4dPG1WyA/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-30T14:48:33Z" } }, { "kind": "youtube#searchResult", "etag": "9JW3PAi-lygHrBabKcoSPGiMw5s", "id": { "kind": "youtube#video", "videoId": "a1eTZ2plty0" }, "snippet": { "publishedAt": "2019-10-28T19:34:29Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "INCLUSIVIDAD 2019", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/a1eTZ2plty0/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/a1eTZ2plty0/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/a1eTZ2plty0/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-28T19:34:29Z" } }, { "kind": "youtube#searchResult", "etag": "aKM4fnOm5V9vsqvUHUjGyJ_UnYU", "id": { "kind": "youtube#video", "videoId": "X6Gg2wORPjI" }, "snippet": { "publishedAt": "2019-10-15T16:18:21Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "9 PIEL BLANCA", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/X6Gg2wORPjI/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/X6Gg2wORPjI/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/X6Gg2wORPjI/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-15T16:18:21Z" } }, { "kind": "youtube#searchResult", "etag": "hT4LK4FeVn-7rwXJSAtBXxv5k1Q", "id": { "kind": "youtube#video", "videoId": "6iVi8QNml-o" }, "snippet": { "publishedAt": "2019-10-15T16:18:23Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "11 OJOS GRANDES", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/6iVi8QNml-o/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/6iVi8QNml-o/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/6iVi8QNml-o/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-15T16:18:23Z" } }, { "kind": "youtube#searchResult", "etag": "dsQSu4hqDbUAFI5WfMlpc3Rx4c0", "id": { "kind": "youtube#video", "videoId": "mrXnYzNPEho" }, "snippet": { "publishedAt": "2019-10-15T16:18:40Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "10 MORENO A", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/mrXnYzNPEho/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/mrXnYzNPEho/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/mrXnYzNPEho/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-15T16:18:40Z" } }, { "kind": "youtube#searchResult", "etag": "Wn9J_emBqUoAAbctghjfELPBOj4", "id": { "kind": "youtube#video", "videoId": "kyLYBvzmRGg" }, "snippet": { "publishedAt": "2019-10-15T16:19:16Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "13 PELON", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/kyLYBvzmRGg/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/kyLYBvzmRGg/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/kyLYBvzmRGg/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-15T16:19:16Z" } }, { "kind": "youtube#searchResult", "etag": "tAYJUvsmDgNOR7rIFPUBDwMNs2Y", "id": { "kind": "youtube#video", "videoId": "_JofPb3ZJ8k" }, "snippet": { "publishedAt": "2019-10-15T16:19:49Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "12 OJOS PEQUEÑOS", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/_JofPb3ZJ8k/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/_JofPb3ZJ8k/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/_JofPb3ZJ8k/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-15T16:19:49Z" } }, { "kind": "youtube#searchResult", "etag": "mNYlLSDJUHGIIbLU4KYEB1HI8HY", "id": { "kind": "youtube#video", "videoId": "qK46BkepvHM" }, "snippet": { "publishedAt": "2019-10-15T16:17:11Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "4 GORDO", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/qK46BkepvHM/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/qK46BkepvHM/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/qK46BkepvHM/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-15T16:17:11Z" } }, { "kind": "youtube#searchResult", "etag": "qVXM2X4vVHLFynfnI_KvaGXP1FU", "id": { "kind": "youtube#video", "videoId": "OVU8-BNkt88" }, "snippet": { "publishedAt": "2019-10-15T16:17:16Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "8 PELO CRESPO", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/OVU8-BNkt88/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/OVU8-BNkt88/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/OVU8-BNkt88/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-15T16:17:16Z" } }, { "kind": "youtube#searchResult", "etag": "W8p9h-DULdlaWOVtlV-C6BSwh6Q", "id": { "kind": "youtube#video", "videoId": "higHEcltg90" }, "snippet": { "publishedAt": "2019-10-15T16:17:55Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "7 PELO CORTO", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/higHEcltg90/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/higHEcltg90/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/higHEcltg90/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-15T16:17:55Z" } }, { "kind": "youtube#searchResult", "etag": "GcDZaCjhdqkEIgcDUffo87WMkMU", "id": { "kind": "youtube#video", "videoId": "bGYMdR5pKYs" }, "snippet": { "publishedAt": "2019-10-15T16:16:46Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "2 ALTO", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/bGYMdR5pKYs/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/bGYMdR5pKYs/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/bGYMdR5pKYs/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-15T16:16:46Z" } }, { "kind": "youtube#searchResult", "etag": "zcV76G52yyaAIAJZUJ93m5wfEls", "id": { "kind": "youtube#video", "videoId": "AGTdNs0ToQQ" }, "snippet": { "publishedAt": "2019-10-15T16:16:45Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "6 PELO LISO", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/AGTdNs0ToQQ/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/AGTdNs0ToQQ/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/AGTdNs0ToQQ/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-15T16:16:45Z" } }, { "kind": "youtube#searchResult", "etag": "ayyfZZJmUMQPYeqvCet1p7TuB7I", "id": { "kind": "youtube#video", "videoId": "Mmv2PqkraRw" }, "snippet": { "publishedAt": "2019-10-15T16:17:23Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "5 DELGADO", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/Mmv2PqkraRw/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/Mmv2PqkraRw/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/Mmv2PqkraRw/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-15T16:17:23Z" } }, { "kind": "youtube#searchResult", "etag": "ouRjUbYVVU_OzzVUniCAaV9lSZI", "id": { "kind": "youtube#video", "videoId": "zNTjO9AiW1c" }, "snippet": { "publishedAt": "2019-10-15T16:16:09Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "1 CARACTERISTICAS PERSONALES", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/zNTjO9AiW1c/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/zNTjO9AiW1c/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/zNTjO9AiW1c/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-15T16:16:09Z" } }, { "kind": "youtube#searchResult", "etag": "Yc82C703uFpAClOkGspXVyOUSqo", "id": { "kind": "youtube#video", "videoId": "BePmJuLIv8g" }, "snippet": { "publishedAt": "2019-10-15T16:16:07Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "3 BAJO", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/BePmJuLIv8g/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/BePmJuLIv8g/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/BePmJuLIv8g/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-15T16:16:07Z" } }, { "kind": "youtube#searchResult", "etag": "ekzH12Byx8olIDKWoyP2NiFN0Yg", "id": { "kind": "youtube#playlist", "playlistId": "PLHQhsEjIaW6m2vb-61fIuzqMcAeK9GDLG" }, "snippet": { "publishedAt": "2019-10-15T16:15:32Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "TALLER LS-NI 2019 CARACTERISTICAS PERSONALES", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/zNTjO9AiW1c/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/zNTjO9AiW1c/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/zNTjO9AiW1c/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-15T16:15:32Z" } }, { "kind": "youtube#searchResult", "etag": "d2UBwqz-rxFv-VOCMB8IgMqbI6c", "id": { "kind": "youtube#video", "videoId": "zGE06p1dq8E" }, "snippet": { "publishedAt": "2019-10-11T17:07:43Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "HISTORIA DE VIDA - FREDDY REYES", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/zGE06p1dq8E/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/zGE06p1dq8E/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/zGE06p1dq8E/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-11T17:07:43Z" } }, { "kind": "youtube#searchResult", "etag": "t3Ftb3DeHifRNKdluUpP0WnJZyY", "id": { "kind": "youtube#video", "videoId": "10xeBFh4vEE" }, "snippet": { "publishedAt": "2019-10-11T17:05:59Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "HISTORIA DE VIDA - JULIO REYES", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/10xeBFh4vEE/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/10xeBFh4vEE/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/10xeBFh4vEE/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-11T17:05:59Z" } }, { "kind": "youtube#searchResult", "etag": "ZdcLMPF-nJvla0dGeD2WpNvNLY0", "id": { "kind": "youtube#video", "videoId": "YOpAiYnJ8jw" }, "snippet": { "publishedAt": "2019-10-11T17:06:11Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "HISTORIA DE VIDA - FREDDY VANEGAS", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/YOpAiYnJ8jw/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/YOpAiYnJ8jw/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/YOpAiYnJ8jw/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-11T17:06:11Z" } }, { "kind": "youtube#searchResult", "etag": "o6RgzzoOnS6yeseqzbfv99UWhYk", "id": { "kind": "youtube#video", "videoId": "UmF7wXV7sMY" }, "snippet": { "publishedAt": "2019-10-11T17:04:37Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "HISTORIA DE VIDA - IRANIA MAYRENA", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/UmF7wXV7sMY/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/UmF7wXV7sMY/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/UmF7wXV7sMY/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-11T17:04:37Z" } }, { "kind": "youtube#searchResult", "etag": "fIibCc7ymhXvRCXhdmmwhq6oOs0", "id": { "kind": "youtube#video", "videoId": "MkzasMGRPR0" }, "snippet": { "publishedAt": "2019-10-11T17:02:16Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "HISTORIA DE VIDEO - RODOLFO AVILES", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/MkzasMGRPR0/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/MkzasMGRPR0/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/MkzasMGRPR0/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-11T17:02:16Z" } }, { "kind": "youtube#searchResult", "etag": "tERdTQVGp2ReCnqtB586F_aDrWA", "id": { "kind": "youtube#playlist", "playlistId": "PLHQhsEjIaW6mywAgfQm9RNAYp6gZjNWnG" }, "snippet": { "publishedAt": "2019-10-11T16:54:48Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "HISTORIAS DE VIDA 2019", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/10xeBFh4vEE/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/10xeBFh4vEE/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/10xeBFh4vEE/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-11T16:54:48Z" } }, { "kind": "youtube#searchResult", "etag": "cxg40Awq3q85TiRmo9ASZ7bRIVE", "id": { "kind": "youtube#video", "videoId": "OaTCAJtDGAg" }, "snippet": { "publishedAt": "2019-10-09T16:18:25Z", "channelId": "UC4plRGib3qc_EqL4o__rkag", "title": "6 PELEAR", "description": "", "thumbnails": { "default": { "url": "https://i.ytimg.com/vi/OaTCAJtDGAg/default.jpg", "width": 120, "height": 90 }, "medium": { "url": "https://i.ytimg.com/vi/OaTCAJtDGAg/mqdefault.jpg", "width": 320, "height": 180 }, "high": { "url": "https://i.ytimg.com/vi/OaTCAJtDGAg/hqdefault.jpg", "width": 480, "height": 360 } }, "channelTitle": "UNAN FAREM CARAZO", "liveBroadcastContent": "none", "publishTime": "2019-10-09T16:18:25Z" } }] };
        const ArrayVideos = [];
        for (var k in response.items) {
            var tituloVideo = response.items[k]["snippet"].title;
            var imagen = response.items[k]["snippet"].thumbnails.high.url;
            var options = "?rel=0&showinfo=0&autohide=1";
            var urlVideo = "https://www.youtube.com/embed/" + response.items[k]["id"].videoId + options;
            var fechaVideo = response.items[k]["snippet"].publishedAt;
            ArrayVideos.push({
                title: tituloVideo,
                description: response.items[k]["snippet"].description,
                url: urlVideo,
                img: imagen,
            })
        }
        var Config = {
            Datasets: ArrayVideos, /*DATOS DE LA TABLA*/
            //Datasets: props.Users, /*DATOS DE LA TABLA*/
            StyleType: "Grid",
            Options: {
                Search: true,
                UserActions: [{
                    name: "Ver", Function: async (Param, control) => {
                        //alert("reserva");
                        //console.log(Param)
                        await import("../WDevCore/WComponents/WModalForm.js");
                        control.parentNode.parentNode.append(WRender.createElement({
                            type: "w-modal-form", props: {
                                id: "Alert",
                                ObjectModal: {
                                    type: "embed", props: {
                                        src: Param.url
                                        , style: "width: 100%; min-height:400px; height: auto"
                                    }
                                },
                            }
                        }));
                    }
                }]
            },
        };
        var Configs = {
            Datasets: ArrayVideos, /*DATOS DE LA TABLA*/
            //Datasets: props.Users, /*DATOS DE LA TABLA*/
            StyleType: "Grid",
            Options: {
                Search: true,
                Show: true,
                Edit: true, UrlUpdate: "http://localhost:6601/" + 'api/User/PostUpdateUser',
                Select: true,
                Add: true, UrlAdd: "http://localhost:6601/" + 'api/User/PostRegister'
            },
        };
        this.children.push({
            type: "w-table",
            props: {
                id: "table",
                TableConfig: Config
            }
        })
    }
    StartModuleList = () => {
        //let response = await AjaxTools.PostRequest(Url_Path + 'api/User/PostRegister', this.MyLoginData);
        //"http://localhost:6601/" + 'api/User/PostTakeUsers'
    }
}
export { ForosView }