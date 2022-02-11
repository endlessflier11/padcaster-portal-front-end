import json
import os

css = f'.container {{\n  height: auto;\n}}\n'

root_dir = './src/components'


def make_js(class_name):
    js = f'import styles from \'./' + class_name + '.module.scss\'\n'
    js += f'\n'
    js += f'const {class_name} = () => {{\n'
    js += f'  return (\n'
    js += f'    <div className={{styles.container}} />\n'
    js += f'  );\n'
    js += f'}}\n'
    js += f'\n'
    js += f'export default {class_name};\n'
    js += f'\n'
    return js


def make_files(path, files):
    for name in files:
        f = open(f'{path}/{name}.js', 'w+')
        f.write(make_js(name))
        f.close()

        f = open(f'{path}/{name}.module.scss', 'w+')
        f.write(css)
        f.close()


def process(name, data):
    path = f'{root_dir}/{name}'
    try:
        os.mkdir(path)
    except:
        pass
    for i in data:
        if i == 'files':
            make_files(path, data[i])
        else:
            process(f'{name}/{i}', data[i])


if __name__ == '__main__':
    f = open('structure.json')
    data = json.load(f)

    for i in data:
        process(i, data[i])
