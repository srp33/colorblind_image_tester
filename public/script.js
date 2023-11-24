//Display images on website or uploaded by user 
let myImage = document.getElementById("uploadedFile");
let uploadForm = document.getElementById("uploadForm");

myImage.onchange = function() {
    if(this.files[0].size > 5242880){
       alert("Your uploaded file is too big. Please choose a file under 5MBs");
       this.value = "";
    } 
};

async function display() {
    let input_image = document.getElementById("input_image");
    if(myImage.files[0]){
        let image = myImage.files[0];
        let url=URL.createObjectURL(image);
        input_image.src = url;
        document.getElementById("input_image_container").style.display = "block";
    }
}

uploadForm.onsubmit = async function(e) {
    e.preventDefault();
    await display();
    await new Promise(resolve => setTimeout(resolve, 10));
    
    await simulateImage();

    await predict_image();
}


// Source: http://web.archive.org/web/20081014161121/http://www.colorjack.com/labs/colormatrix/
// Another Source: https://www.reddit.com/r/gamedev/comments/2i9edg/code_to_create_filters_for_colorblind/


// Matrixes taken from
// https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html
/*
Gustavo M. Machado, Manuel M. Oliveira, and Leandro A. F. Fernandes
"A Physiologically-based Model for Simulation of Color Vision Deficiency".
IEEE Transactions on Visualization and Computer Graphics. Volume 15 (2009),
Number 6, November/December 2009. pp. 1291-1298.
*/

var getMachadoMatrix = (function () {
    const machadoMatrixes = {
        'Deuteranomaly': new Float64Array([
            1.000000, 0.000000, -0.000000,
            0.000000, 1.000000, 0.000000,
            -0.000000, -0.000000, 1.000000,
            0.866435, 0.177704, -0.044139,
            0.049567, 0.939063, 0.011370,
            -0.003453, 0.007233, 0.996220,
            0.760729, 0.319078, -0.079807,
            0.090568, 0.889315, 0.020117,
            -0.006027, 0.013325, 0.992702,
            0.675425, 0.433850, -0.109275,
            0.125303, 0.847755, 0.026942,
            -0.007950, 0.018572, 0.989378,
            0.605511, 0.528560, -0.134071,
            0.155318, 0.812366, 0.032316,
            -0.009376, 0.023176, 0.986200,
            0.547494, 0.607765, -0.155259,
            0.181692, 0.781742, 0.036566,
            -0.010410, 0.027275, 0.983136,
            0.498864, 0.674741, -0.173604,
            0.205199, 0.754872, 0.039929,
            -0.011131, 0.030969, 0.980162,
            0.457771, 0.731899, -0.189670,
            0.226409, 0.731012, 0.042579,
            -0.011595, 0.034333, 0.977261,
            0.422823, 0.781057, -0.203881,
            0.245752, 0.709602, 0.044646,
            -0.011843, 0.037423, 0.974421,
            0.392952, 0.823610, -0.216562,
            0.263559, 0.690210, 0.046232,
            -0.011910, 0.040281, 0.971630,
            0.367322, 0.860646, -0.227968,
            0.280085, 0.672501, 0.047413,
            -0.011820, 0.042940, 0.968881])
    };
    
    function getForSeverityStep(full, step) {
        //console.log(step)
        if (step < 0 || step > 10) {
            throw "invalid step " + step
        }
        return full.subarray(step * 9, step * 9 + 9)
    }
    
    return function (type, severity) {
        //console.log(type, severity);

        if (!(type in machadoMatrixes)) {
            throw "unknown type" + type;
        }
        if (severity>100 || severity < 0) {
            throw "invlid severity";
        }
        const full = machadoMatrixes[type];
        var matrix;

        const step = Math.floor(severity / 10);
        const nextstep = Math.ceil(severity / 10);
        const weight = (severity - step * 10) / 10;
        const weightInv = 1 - weight;
        const prevMatrix = getForSeverityStep(full, step)
        const nextMatrix = getForSeverityStep(full, nextstep)
        matrix = new Float64Array(9);
        matrix[0] = prevMatrix[0] * weightInv + nextMatrix[0] * weight;
        matrix[1] = prevMatrix[1] * weightInv + nextMatrix[1] * weight;
        matrix[2] = prevMatrix[2] * weightInv + nextMatrix[2] * weight;
        matrix[3] = prevMatrix[3] * weightInv + nextMatrix[3] * weight;
        matrix[4] = prevMatrix[4] * weightInv + nextMatrix[4] * weight;
        matrix[5] = prevMatrix[5] * weightInv + nextMatrix[5] * weight;
        matrix[6] = prevMatrix[6] * weightInv + nextMatrix[6] * weight;
        matrix[7] = prevMatrix[7] * weightInv + nextMatrix[7] * weight;
        matrix[8] = prevMatrix[8] * weightInv + nextMatrix[8] * weight;
        
        return function(rgb) {
            const r = rgb[0];
            const g = rgb[1];
            const b = rgb[2];
            const result = [
                matrix[0] * r + matrix[1] * g + matrix[2] * b,
                matrix[3] * r + matrix[4] * g + matrix[5] * b,
                matrix[6] * r + matrix[7] * g + matrix[8] * b,
            ];
            return result;
    
        };
    }
    })()

function getFilterFunction(type) {
    var lib;
    return getMachadoMatrix("Deuteranomaly", 80, 10);
}



function createFilteredImageAsync(img, type, filteredImage) {
    //console.log('createFilteredImageAsync');

    return new Promise((resolve, reject) => {
        var filterFunction = getFilterFunction(type);
        var canvas = document.createElement('canvas');
        var w = img.naturalWidth;
        var h = img.naturalHeight;
        canvas.setAttribute('width', w);
        canvas.setAttribute('height', h);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var pixels = ctx.getImageData(0, 0, w, h);

        var i = 0;

        // Use setTimeout to simulate asynchronous behavior
        setTimeout(() => {
            for (; i < pixels.data.length; i += 4) {
                var rgb = [pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]];
                filteredRGB = filterFunction(rgb);
                pixels.data[i] = filteredRGB[0];
                pixels.data[i + 1] = filteredRGB[1];
                pixels.data[i + 2] = filteredRGB[2];
            }

            ctx.putImageData(pixels, 0, 0);

            filteredImage.src = canvas.toDataURL();
            resolve(); // Resolve the promise when the heavy computation is done
        }, 0); // Adjust the delay time if needed (set to 0 for immediate execution)
    });
}


// function getFilteredImage(img, type, callback) {
//     console.log('getFilteredImage');
//     var filtered = createFilteredImage(img, type, function (filtered, url) {
//         imageCache[type] = filtered;
//         urlCache[type] = url;
//         callback(filtered, url);
//     });
// }



async function simulateImage(){
    //console.log("Simulate image.");
    let output_image = document.getElementById("output_image");

    output_image.style.display = "none";
    //document.getElementById("output_image").style.display = "none";

    document.getElementById("loader").style.display = "inline";
    document.getElementById("simulated_image_text").style.visibility = "hidden";

  
    let input_image = document.getElementById("input_image");

    try {
        await createFilteredImageAsync(input_image, "Deuteranomaly", output_image);
        output_image.style.display = "inline";
        document.getElementById("loader").style.display = "none";
        document.getElementById("simulated_image_text").style.visibility = "visible";

    } catch (error) {
        alert("We encountered an error. Your image may be an invalid type, please try again with a new image.")
        console.error("An error occurred:", error);
        document.getElementById("loader").style.display = "none";

        // Handle errors if necessary
    }

}




async function predict_image() {
    document.getElementById("loader1").style.display = "inline";

    document.getElementsByClassName("output_screen")[0].style.display = "hidden";

    let input_image = document.getElementById("input_image");
    let tfImg;
    
    tfImg = tf.browser.fromPixels(input_image)
        .resizeNearestNeighbor([224, 224]) // change image size
        .expandDims() // expand tensor rank
        .toFloat();

    const model = await tf.loadGraphModel('/colorblind_friendly_tester/public/tfjs_target_dir/model.json');
    //const model = await tf.loadGraphModel('/colorblind_friendly_tester/public/savedModel/model.json');

    //const model = await tf.loadGraphModel('public/savedModel/model.json');

    pred = model.predict(tfImg);
    //In dataset, 0 = Friendly, 1 = Unfriendly
    let result = "";

    pred.data().then((data) => {
        document.getElementsByClassName("output_screen")[0].style.display = "flex";
        if (data > 0.5) {   
            result = "Unfriendly";
            document.getElementById("output_text").innerHTML = "<p>Our model predicts that this image is: </p><p id='prediction_text' style='color: red;'>" 
            + result + "</p><p>("+ (data * 100).toFixed(2) +"% confidence)</p>" +
            '<p>The closer the confidence to 100%, the higher the confidence the model has in its prediction.</p>';

        }
        else {
            result = "Friendly";
            document.getElementById("output_text").innerHTML = "<p>Our model predicts that this image is: </p><p id='prediction_text' style='color: green;'>" 
            + result + "</p><p>("+ (100-data * 100).toFixed(2) +"% confidence)</p>"+
            '<p>The closer the confidence to 100%, the higher the confidence the model has in its prediction.</p>';

            //document.getElementById("output_text").innerHTML = "<p>Our model predicts that this image is: </p><p id='prediction_text'>" + result + " with a " + (100-data * 100).toFixed(2) + "% probability</p>";
        }
    });
    document.getElementById("loader1").style.display = "none";
}