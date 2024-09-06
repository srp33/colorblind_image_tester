# Colorblind image tester

We created this web application as part of a [paper](https://elifesciences.org/reviewed-preprints/95524) to estimate how often scientific figures in biology-related papers are problematic to people with color vision deficiencies (CVD). After manually evaluating 6,000 images from the [eLife journal](https://elifesciences.org), we found that ~13% of images would be hard to interpret for someone with deuteranopia, the most common form of CVD (red/green colorblindness). From this curated dataset, we trained a convolutional neural network (CNN) to predict whether images are colorblind-friendly or not. This web application makes it possible for biologists to apply our CNN to their own images. Users can upload a JPG or PNG image, and the Web application will display a simulated image that approximates how a person with moderate-to-severe deuteranopia would see the image. Additionally, they will see a prediction—based on the CNN—about whether the image is "friendly" or not. This prediction includes a probability so that users can understand the extent to which the model is "confident" in its predictions. Our model is accurate but not perfect; therefore, we encourage biologists to use this tool as a starting point, not to obtain definitive answers about whether a given image is friendly or not. Also, our CNN was trained on biology-related images. It might be less effective for images from other disciplines.

You can run the Web application locally (instructions below). Or you can use the site hosted [here](https://bioapps.byu.edu/colorblind_image_tester).

## Running the Web application locally

1. Ensure you have Docker up and running. It can be downloaded [here](https://docs.docker.com/get-docker/).
2. Clone this repository.
3. At the terminal, change your working directory to the location of the cloned repository.
4. Run the following command at the terminal: `./build_docker.sh` (this assumes you are using a Linux-based operating system).
5. Run the following command at the terminal: `./run_docker.sh`
6. Use a browser to access the website at http://localhost:8080/colorblind_image_tester.

## Reporting bugs or making improvements

Please [let us know](https://github.com/srp33/colorblind_image_tester/issues) if you have a question or find a bug with the tool. We also welcome pull requests!
