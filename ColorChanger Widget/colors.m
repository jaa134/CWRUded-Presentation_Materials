img_w = 800;
img_h = 100;

image = zeros(img_h, img_w, 3);
green = [51 165 50];
yellow = [231 180 22];
red = [204 50 50];
gy_dRGB = [(yellow(1)-green(1)) (yellow(2)-green(2)) (yellow(3)-green(3))] ./ (img_w / 2);
yr_dRGB = [(red(1)-yellow(1)) (red(2)-yellow(2)) (red(3)-yellow(3))] ./ (img_w / 2);
currentColor = green;

%transition from green to yellow
for i = 1:(img_w / 2)
    image(:, i, 1) = currentColor(1) / 255;
    image(:, i, 2) = currentColor(2) / 255;
    image(:, i, 3) = currentColor(3) / 255;
    currentColor = currentColor + gy_dRGB;
end

%transition from yellow to red
for i = (img_w / 2)+1:img_w
    image(:, i, 1) = currentColor(1) / 255;
    image(:, i, 2) = currentColor(2) / 255;
    image(:, i, 3) = currentColor(3) / 255;
    currentColor = currentColor + yr_dRGB;
end


imshow(image);