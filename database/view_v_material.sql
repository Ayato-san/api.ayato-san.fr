--
-- Structure de la vue `v_material`
--
DROP VIEW IF EXISTS `v_material`;

CREATE VIEW `v_material`  AS 
SELECT `material`.`id` AS `id`, `material`.`type` AS `typeId`, `material_type`.`name` AS `typeName`, `material`.`brand` AS `brandId`, `material_brand`.`name` AS `brandName`, `material`.`name` AS `name`, `material`.`description` AS `description`, `material`.`image` AS `image`, `material`.`link` AS `link`
FROM `material` JOIN `material_type` ON `material`.`type` = `material_type`.`id` JOIN `material_brand` ON `material`.`brand` = `material_brand`.`id`;
