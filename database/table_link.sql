--
-- Structure de la table `link`
--

DROP TABLE IF EXISTS `link`;
CREATE TABLE IF NOT EXISTS `link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(254) NOT NULL,
  `name_alt` varchar(254) DEFAULT NULL,
  `pseudo` varchar(254) NOT NULL,
  `link` varchar(254) NOT NULL,
  PRIMARY KEY (`id`)
)
