// // // // // src/components/LanguageSelector.js
// // // // // http://localhost:5000/translation/translate


// // src/components/LanguageSelector.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import '../Navbar/Navbar.css'

// function LanguageSelector() {
//     const [selectedLanguage, setSelectedLanguage] = useState('en');

//     const handleLanguageChange = async (newLanguage) => {
//         try {
//             const response = await axios.post('https://stackoverflow-server-z13s.onrender.com/translation/translate', { //change backend link
//                 text: document.body.innerHTML, // Translate the entire HTML content
//                 targetLanguage: newLanguage,
//             });

//             const translatedHTML = response.data.translatedText;
//             setSelectedLanguage(newLanguage);

//             // Update the page content with translated HTML
//             document.body.innerHTML = translatedHTML;
//         } catch (error) {
//             console.error('Translation error:', error);
//         }
//     };

//     return (
//         <div>
//             <select className='nav-item nav-btn' value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
//                 <option value="en">English</option>
//                 <option value="hi">Hindi</option>
//                 <option value="fr">French</option>
//                 {/* Add more language options as needed */}
//             </select>
//         </div>
//     );
// }

// export default LanguageSelector;

// http://localhost:5000/translation/translate


