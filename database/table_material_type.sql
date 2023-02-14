--
-- Structure de la table `material_type`
--

DROP TABLE IF EXISTS `material_type`;
CREATE TABLE IF NOT EXISTS `material_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(254) NOT NULL,
  PRIMARY KEY (`id`)
)
