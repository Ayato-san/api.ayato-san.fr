SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Structure de la table `scan`
--
DROP TABLE IF EXISTS `scan`;
CREATE TABLE IF NOT EXISTS `scan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_original` varchar(254) NOT NULL,
  `name_en` varchar(254) NOT NULL,
  `name_alt` varchar(254) NOT NULL,
  `link` varchar(254) NOT NULL,
  `image` varchar(254) NOT NULL,
  `description` text NOT NULL,
  `censure` tinyint(1) NOT NULL DEFAULT 0,
  `complete` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
);

--
-- AUTO_INCREMENT pour la table `scan`
--
ALTER TABLE `scan` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
COMMIT;
