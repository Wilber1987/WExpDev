-- IF usuario is not null THEN
			SELECT 'Total' as tipo, id_factura, fecha,total as valor
			FROM sps_factura 
			where cast(fecha as date)>= desde and cast(fecha as date) <= hasta
			union 
			SELECT 'Impuesto' as tipo, id_factura, fecha,impuesto as valor
			FROM sps_factura 
			where cast(fecha as date)>= desde and cast(fecha as date) <= hasta
			union
			SELECT 'Monto' as tipo, id_factura, fecha,monto as valor
			FROM sps_factura 
		-- 	where cast(fecha as date)>= desde and cast(fecha as date) <= hasta
			
			union		
			
			SELECT 'Costos operativos' as tipo, t0.id_factura, t0.fecha,
			SUM(t1.total) + (CASE WHEN t0.striped_code is null then 0 else (t0.total*(t3.porcentaje/100)) +t3.monto_fijo end)
			as valor
			FROM sps_factura t0
			inner join sps_detalle_factura t1 on t1.id_factura = t0.id_factura
			inner join configuracion_pagos t2 on t2.id = t1.id_configuracion AND t2.tipo = 'Detalle' and t2.tipo_cuenta = 'debita'
			LEFT JOIN configuracion_pagos t3 on t3.id = 1
		-- 	 where cast(t0.fecha as date)>= desde and cast(t0.fecha as date) <= hasta
			-- GROUP BY t0.id_factura
			union
			
			SELECT 'Beneficio' as tipo, t0.id_factura, t0.fecha,
			t0.total - (SUM(t1.total) + (CASE WHEN t0.striped_code is null then 0 else (t0.total*(t3.porcentaje/100)) +t3.monto_fijo end)) - t0.impuesto
			as valor
			FROM sps_factura t0
			inner join sps_detalle_factura t1 on t1.id_factura = t0.id_factura
			inner join configuracion_pagos t2 on t2.id = t1.id_configuracion AND t2.tipo = 'Detalle' and t2.tipo_cuenta = 'debita'
			LEFT JOIN configuracion_pagos t3 on t3.id = 1
			where cast(t0.fecha as date)>= desde and cast(t0.fecha as date) <= hasta;