--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(254) NOT NULL,
  `displayName` varchar(254) NOT NULL,
  PRIMARY KEY (`id`);
)