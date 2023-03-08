SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Structure de la table `user`
--
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(254) NOT NULL,
  `displayName` varchar(254) NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
COMMIT;
