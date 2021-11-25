SELECT
	* 
FROM
	tblseguimientousuario AS ls
	INNER JOIN dim_usuarios AS du ON du.id_usuario = ls.id_usuario
	INNER JOIN log_estados_psicoemocionales ON log_estados_psicoemocionales.id_seguimiento = ls.id_seguimiento 
WHERE
	ls.fecha BETWEEN '2019-01-01' 
	AND '2021-11-24';
	
	select * from log_estados_psicoemocionales ORDER BY fecha desc
	
	SELECT * FROM tblseguimientousuario as ls INNER JOIN dim_usuarios as du ON du.id_usuario = ls.id_usuario INNER JOIN log_estados_psicoemocionales ON log_estados_psicoemocionales.id_seguimiento = ls.id_seguimiento WHERE ls.fecha BETWEEN '2019-01-01' and '2021-11-24'
	
	SELECT * FROM dim_usuarios
	UPDATE dim_usuarios set Cargo = "Técnico" WHERE cargo = "T?cnico";
	UPDATE dim_usuarios set departamento_area = "Informática" WHERE departamento_area = "Inform?tica";
	UPDATE dim_usuarios set departamento_area = "Psicología" WHERE departamento_area = "Psicolog?a";
		UPDATE dim_usuarios set departamento_area = "Ecommerce" WHERE departamento_area = "Ecommerce / ?rea Digital";
	UPDATE dim_usuarios set departamento_area = "Animales" WHERE departamento_area = "Animales de compa??a";
		UPDATE dim_usuarios set departamento_area = "finanza" WHERE departamento_area = "Administraci?n y finanza";
		UPDATE dim_usuarios set nombre_empresa = "Cuidar de los míos" WHERE nombre_empresa = "Cuidar de los m?os";
UPDATE dim_usuarios set centro = "Informática" WHERE centro = "Inform?tica";
UPDATE dim_usuarios set antiguedad_etiqueta = "Más de 10 años" WHERE antiguedad_etiqueta = "M?s de 10 a?os";
UPDATE dim_usuarios set antiguedad_etiqueta = "De 4 a 6 años" WHERE antiguedad_etiqueta = "De 4 a 6 a?os";
UPDATE dim_usuarios set antiguedad_etiqueta = "De 1 a 3 años" WHERE antiguedad_etiqueta = "De 1 a 3 a?os";
UPDATE dim_usuarios set antiguedad_etiqueta = "De 7 a 10 años" WHERE antiguedad_etiqueta = "De 7 a 10 a?os";

UPDATE dim_usuarios set edad_etiqueta = "Más de 61" WHERE edad_etiqueta = "M?s de 61";

SELECT  COUNT(distinct ls.id_usuario) AS EvalValue, ls.*
FROM
	tblseguimientousuario AS ls
	INNER JOIN dim_usuarios AS du ON du.id_usuario = ls.id_usuario
	INNER JOIN log_estados_psicoemocionales as DIM  ON DIM.id_seguimiento = ls.id_seguimiento
WHERE (ls.fecha BETWEEN '2019-01-01' AND '2021-11-24')
	-- AND ls.fecha = (SELECT MAX(fecha) FROM  tblseguimientousuario as sub WHERE (sub.fecha BETWEEN '2019-01-01' AND '2021-11-24') AND sub.fecha <= ls.fecha AND sub.id_usuario = ls.id_usuario)
GROUP BY ls.estado_final, ls.year
ORDER BY ls.fecha DESC
	