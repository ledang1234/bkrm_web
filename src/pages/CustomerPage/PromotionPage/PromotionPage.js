import React, {useState} from 'react'
// import Editor from '@react-page/editor'

// import slate from "@react-page/plugins-slate";
// import image from "@react-page/plugins-image";
// import  {imagePlugin} from "@react-page/plugins-image";

// import "@react-page/editor/lib/index.css";
// import "@react-page/plugins-image/lib/index.css";



// const cellPlugins = [slate(),
//     imagePlugin({
//         imageUpload: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Derbys_Peter_Pan_peanut_butter_sample_blikje%2C_foto3.JPG'
//       }),
    
      
//     ];

const PromotionPage = () => {
    const [value, setValue] = useState(null);

    return (
        <div>
            {/* <Editor
                cellPlugins={cellPlugins}
                value={value}
                onChange={setValue}
            /> */}
        </div>
    )
}

export default PromotionPage
