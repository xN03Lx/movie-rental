# -*- coding: utf-8 -*-
{
    'name': "movie_rental",
    'summary': """
        Short (1 phrase/line) summary of the module's purpose, used as
        subtitle on modules listing or apps.openerp.com
    """,
    'description': """
        Long description of module's purpose
    """,
    'author': "noel",
    'website': "http://www.yourcompany.com",
    'category': 'Vudoo',
    'version': '0.1',
    'depends': [
        'base',
        'website'
    ],
    'data': [
        # 'security/ir.model.access.csv',
        'views/assets.xml',
        'views/views.xml',
        'views/templates.xml',
    ]
}
