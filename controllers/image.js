

const ImageURL = (req,res) => {

    //const input = req.body.input;
    const returnClarifaiRequestOptions = (temp) => {
        ///////////////////////////////////////////////////////////////////////////////////////////////////
      // In this section, we set the user authentication, user and app ID, model details, and the URL
      // of the image we want as an input. Change these strings to run your own example.
      //////////////////////////////////////////////////////////////////////////////////////////////////
  
      // Your PAT (Personal Access Token) can be found in the portal under Authentification
      const PAT = '4ecfe0574feb44ffa3ba8488f0b76d3e';
      // Specify the correct user_id/app_id pairings
      // Since you're making inferences outside your app's scope
      const USER_ID = 'oc0g0d3kapls';       
      const APP_ID = 'test';
      // Change these to whatever model and image URL you want to use
      const MODEL_ID = 'face-detection'; 
      const IMAGE_URL = temp;
  
      ///////////////////////////////////////////////////////////////////////////////////
      // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
      ///////////////////////////////////////////////////////////////////////////////////
  
      const raw = JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": IMAGE_URL
                      }
                  }
              }
          ]
      });
  
      const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
      };
      return requestOptions;
  }

  console.log(req.body.input);
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(req.body.input))
    .then( response=> {
            res.json(response.data);
    })
    .catch(err =>  res.status(400).json('API problem'));
}


const ImageHandle = (req,res,db) => {
    const { id } = req.body;
    db('users').where('id','=',id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err =>  res.status(400).json('unable to get entries'))
    }


module.exports = {
    ImageHandle: ImageHandle,
    ImageURL: ImageURL
}