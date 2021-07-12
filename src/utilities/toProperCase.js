/*****************************************************************************************************************************
NOTICE
This (software/technical data) was produced for the U. S. Government under Contract Number 75FCMC18D0047, and is subject to 
Federal Acquisition Regulation Clause 52.227-14, Rights in Data-General. No other use other than that granted to the U. S. 
Government, or to those acting on behalf of the U. S. Government under that Clause is authorized without the express written 
permission of The MITRE Corporation.For further information, please contact The MITRE Corporation, Contracts Management Office, 
7515 Colshire Drive, McLean, VA 22102-7539, (703) 983-6000.
© 2021 The MITRE Corporation.
******************************************************************************************************************************/

/*
 * Returns a string where words have capitalized first letters.
 * @param forceCase: If true, force proper case all strings (incl. fully capitalized strings)
 */
export const toProperCase = function (str, forceCase) {
    // Whitelist of words that should not be capitalized
    let whitelist = ["a", "an", "and", "at", "but", "by", "for", "from", "nor", "of", "or", "so", "the", "to", "with", "yet"];

    if (!str)
        return str;
    return str.split(' ')
        .map(w => {
            if (w) {
                // Handle non-capitalized words
                if (whitelist.includes(w.trim().toLowerCase()))
                    return w.toLowerCase();
                // Ignore URLs and acronyms/other fully capitalized strings
                if ((w.startsWith("http")) || (!forceCase && w === w.toUpperCase()))
                    return w;
                for (let i = 0; i < w.length; i++) {
                    // Only capitalize the first letter of a given string (ignore other characters)
                    if (w[i].match(/[a-z]/i))
                        return w.substr(0, i) + w[i].toUpperCase() + w.substr(i + 1).toLowerCase();
                }
            }
            return "";
        }).join(' ');
};
