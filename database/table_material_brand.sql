SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Structure de la table `material_brand`
--
DROP TABLE IF EXISTS `material_brand`;
CREATE TABLE IF NOT EXISTS `material_brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(254) NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- AUTO_INCREMENT pour la table `material_brand`
--
ALTER TABLE `material_brand` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
COMMIT;
