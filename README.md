# text-to-tts-component
Generates a png for use with Tabletop Simulator custom components. Put `https://text-to-tts-component.herokuapp.com` in the url field for any component image on Tabletop Simulator along with the appropriate query params. This is intended for very early prototypes specifically, so the components are going to be single color backgrounds with single color text in a single font size. Nothing pretty.

#### Example
https://text-to-tts-component.herokuapp.com?text=Attack%20enemy%20character%0Afor%2020%20damage.&width=44.5&height=68&bgColor=%23222A68&textColor=%23F2F5FF&fontSize=12px&title=Attack&titleSize=16px

#### Query Params
| **query param**    | **usage**                                                                                                                              | **default** |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------------|-------------|
| **t \| text**      | use URL encoding for new lines, "&", "#", "%", etc..., shouldn't need to for spaces, but you can just to be safe<br>%0A = new line, %26 = &, %23 = #, %25 = %, %20 = space                                            | ""          |
| **w \| width**     | size is in mm then multiplied by 8 for better resolution<br>default size is 63.5mm x 88mm, which is the standard card size | 63.5        |
| **h \| height**    | same as width                                                                                                                          | 88          |
| **c \| textColor** | can be any string useable on color css                                                                                                 | black       |
| **b \| bgColor**   | same as text color                                                                                                                     | white       |
| **f \| fontSize**  | can use any string useable on font-size css                                                                                            | 16px        |
| **t \| title**  | will be put above regular text and bolded                                                                                          | ""        |
| **ts \| titleSize**  | can use any string useable on font-size css                                                                                            | 20px        |
