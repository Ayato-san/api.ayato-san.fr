--
-- Structure de la vue `v_material`
--
DROP TABLE IF EXISTS `v_material`;

CREATE VIEW `v_material`  AS SELECT `material`.`id` AS `id`, `material`.`type` AS `typeId`, `material_type`.`name` AS `typeName`, `material`.`name` AS `name`, `material`.`description` AS `description`, `material`.`image` AS `image`, `material`.`link` AS `link` FROM (`material` join `material_type` on(`material`.`type` = `material_type`.`id`)) ;
