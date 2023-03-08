SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Structure de la table `material_type`
--
DROP TABLE IF EXISTS `material_type`;
CREATE TABLE IF NOT EXISTS `material_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(254) NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- AUTO_INCREMENT pour la table `material_type`
--
ALTER TABLE `material_type` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
COMMIT;
