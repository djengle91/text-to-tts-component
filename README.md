# text-to-tts-component
Generates a png for use with Tabletop Simulator custom components. Use the Github Pages url for this project in any TTS component.

#### Query Params
| **query param**    | **usage**                                                                                                                              | **default** |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------------|-------------|
| **t \| text**      | use URL encoding for spaces, new lines, "&", etc...<br>%20 = space, %0A = new line, %26 = &                                            | ""          |
| **w \| width**     | size is in mm then multiplied by 4 to get approximate size in pixels<br>default size is 63.5mm x 88mm, which is the standard card size | 63.5        |
| **h \| height**    | same as width                                                                                                                          | 88          |
| **c \| textColor** | can be any string useable on color css                                                                                                 | black       |
| **b \| bgColor**   | same as text color                                                                                                                     | white       |
| **f \| fontSize**  | can use any string useable on font-size css                                                                                            | 16px        |
